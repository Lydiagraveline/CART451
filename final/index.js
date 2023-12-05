const portNumber = 4200;
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express(); //make an instance of express
const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';
const client = new MongoClient(mongoURI, {});
app.use(express.static('public'));
let fs = require('fs');
let natural = require ('natural');
let tokenizer = new natural.WordTokenizer();
let sentenceSplitter = new natural.SentenceTokenizer();
let ngrams = natural.NGrams;
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();


const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

let lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);

let ruleSet = new natural.RuleSet("EN");
let tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

// let textFile = fs.readFileSync("files/instaDM.txt", 'utf8'); //instead of this file, use the filteredLydiaMessages
// let sentences = sentenceSplitter.tokenize(textFile);

// let tokenList = []
// for(let i = 0; i<sentences.length; i++){
//   //  tokenList.push(...tokenizer.tokenize(sentences[i])); //...ellipse... breaks apart the array //...tokenizer.tokenize etc.
// }
// tfidf.addDocument(tokenList);

// tfidf.listTerms(0 /*document index*/).forEach(function (item) {
//   console.log(item.term + ': ' + item.tfidf);
// });

const fetchDataFromCollection = async (res, collectionName, callback) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('PersonalData');
    const collection = db.collection(collectionName);
   
    let data;

    // Optional, call a function to filter or sort the data
    if (typeof callback === 'function') {
        // If a filter callback is provided, use it to filter the data
      data = await collection.find({}).toArray();
      data = callback(data); // data = data.filter(filterCallback);
    } else {
        // If no filter callback is provided, fetch all data
        data = await collection.find({}).toArray();
    }

    res.json(data);
  } catch (error) {
    console.error(`Error connecting to MongoDB for ${collectionName} data:`, error);
    res.status(500).send('Error fetching data');
  } finally {
    if (client !== null) {
      client.close();
    }
  }
};

// //callback for mediaData
const filterAndSortMedia = (mediaData) => {
  // Filter out items without creationTimestampMs
  const filteredData = mediaData.filter((item) => item.creationTimestampMs !== undefined);
  // Sort the filtered data by creationTimestampMs
  const sortedData = filteredData.sort((a, b) => a.creationTimestampMs - b.creationTimestampMs);
  return sortedData;
};

const filterLydiaMessages = (instaData) =>{
  const contentArray = [];
  instaData.forEach(dataObject => {
    const filtered = dataObject.messages.filter((message) => message.sender_name === 'Lydia');
     // Use map to extract 'content' property from each filtered message
     const contents = filtered.map(message => {
      // Check if content is defined before decoding
      if (message.content !== undefined) {
        // Decode the content using decodeURIComponent
        return decodeURIComponent(escape(message.content));
      } else {
        return undefined; // Skip decoding for undefined content
      }
    });
  // Add the contents to the array
  contentArray.push(...contents);
});
  // Filter out undefined values
  const filteredContentArray = contentArray.filter(content => content !== undefined);
  // Log the array of 'content' without undefined values

  // Create a single string by joining all messages
  const singleString = filteredContentArray.join(' ');

   // Convert all terms to lowercase
   const lowercasedText = singleString.toLowerCase();

   // Tokenize the text
   const tokenList = tokenizer.tokenize(lowercasedText);

     // Perform word frequency analysis
  const wordFrequency = tokenList.reduce((frequency, term) => {
    frequency[term] = (frequency[term] || 0) + 1;
    return frequency;
  }, {});

    // Sort the words by frequency
    const sortedWordsByFrequency = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );

   //  console.log(sortedWordsByFrequency);

    // Perform POS tagging
    const taggedTokens = tagger.tag(tokenList);

      // Ensure taggedTokens has the expected structure
  if (
    !taggedTokens ||
    !taggedTokens.taggedWords ||
    !Array.isArray(taggedTokens.taggedWords)
  ) {
    console.error('Error: taggedTokens structure is not as expected');
    return []; // or handle the error in an appropriate way
  }

    // Extract only the tagged terms with POS tags
    const terms = taggedTokens.taggedWords.map(token => ({ 
      term: token.token, 
      pos: token.tag 
    }));
  
    // Add the tokenized document to the TfIdf model
    tfidf.addDocument(terms.map(token => token.term));
  
 // Get terms and their TfIdf values
 const termsWithTfIdf = tfidf
 .listTerms(0)
 .map((item) => ({
   term: item.term,
   tfidf: item.tfidf,
   pos: findPos(terms, item.term),
   frequency: wordFrequency[item.term] || 0,
 }));

  //  Organize terms into separate arrays based on part of speech
    const termsByPos = termsWithTfIdf.reduce((acc, term) => {
      if (!acc[term.pos]) {
        acc[term.pos] = [];
      }
      acc[term.pos].push(term);
      return acc;
    }, {});

    // console.log(termsByPos);
     console.log(termsWithTfIdf);
  
    // Print separate arrays for each part of speech
    Object.keys(termsByPos).forEach(pos => {
     // console.log(`Terms for POS ${pos}:`, termsByPos[pos]);
    });
    
    return termsWithTfIdf;
}

// Helper function to find the POS tag for a given term
function findPos(terms, targetTerm) {
  const termObj = terms.find(term => term.term === targetTerm);
  return termObj ? termObj.pos : 'N/A'; // Return 'N/A' if POS tag not found
}


// Endpoint for 'hinge_matches' collection
app.get('/hingeData', async (req, res) => {
  await fetchDataFromCollection(res, 'hinge_matches');
});

// Endpoint for 'instagramDM' collection
app.get('/instagramData', async (req, res) => {
  await fetchDataFromCollection(res, 'instagramDM', filterLydiaMessages);
});

// Endpoint for 'media' collection
app.get('/mediaData', async (req, res) => {
  await fetchDataFromCollection(res, 'media', filterAndSortMedia);
});

// Endpoint for 'user' collection
app.get('/userData', async (req, res) => {
  await fetchDataFromCollection(res, 'user');
});

app.get('/inferences', async (req, res) => {
  await fetchDataFromCollection(res, 'inferences');
})


app.listen(portNumber, () => {
  console.log("Server is running on port "+portNumber);
});


//    app.listen(portNumber, () => {
//     console.log("Server is running on port "+portNumber);
//   });

// function clientRoute(req, res, next) {
//    res.sendFile(__dirname + "/public/client.html");
//  }