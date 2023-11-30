const portNumber = 4200;
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express(); //make an instance of express
const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';
const client = new MongoClient(mongoURI, {});
app.use(express.static('public'));

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

// Endpoint for 'hinge_matches' collection
app.get('/hingeData', async (req, res) => {
  await fetchDataFromCollection(res, 'hinge_matches');
});

// Endpoint for 'instagramDM' collection
app.get('/instagramData', async (req, res) => {
  await fetchDataFromCollection(res, 'instagramDM');
});

// Endpoint for 'media' collection
app.get('/mediaData', async (req, res) => {
  await fetchDataFromCollection(res, 'media', filterAndSortMedia);
});

// Endpoint for 'user' collection
app.get('/userData', async (req, res) => {
  await fetchDataFromCollection(res, 'myUser');
});

app.listen(portNumber, () => {
  console.log("Server is running on port "+portNumber);
});


//    app.listen(portNumber, () => {
//     console.log("Server is running on port "+portNumber);
//   });

// function clientRoute(req, res, next) {
//    res.sendFile(__dirname + "/public/client.html");
//  }