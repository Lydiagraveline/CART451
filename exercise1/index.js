let express = require('express');
const portNumber = 8080;
const app = express(); //make an instance of express
const server = require("http").createServer(app);

// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));

//whats dis
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use("/client", clientRoute);

require("dotenv").config();

app.listen(portNumber, function () {
  console.log("Server is running on port "+portNumber);

});

//tutorial https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {});

async function run() {
  try { 
    // Connect the client to the server	(optional starting in v4.7)
    client.connect().then((res) => {
      console.log("connected");

      const database = client.db("reddit_posts");
      const post = database.collection("helpfulRedditPosts");
      let getSearchCrit = async function (req, res) {
        let searchText = req.query.exp;
        let sortMethod = req.query.sortMethod; // Retrieve the sortMethod parameter

        let sortField = 'searchScore'; // Default sorting field
        //console.log(sortMethod);
        if (sortMethod === 'rSort') {
          sortField = 'searchScore'; // Sort by post title
        } else if (sortMethod === 'pSort') {
          sortField = 'score'; // Sort by author
        } else if (sortMethod === 'random'){
          console.log("RANDOM!!")
        }
        
        // Add more conditions as needed for other sorting options
   
        //console.log(sortField);
    
        let regexM = new RegExp(req.query.exp);
        let projected_out = await post.aggregate([
          { 
            $match: { 
              $text: { $search: searchText }
            }
          },
          {
            $addFields: { 
              searchScore: { $meta: "textScore" } 
            }
          },
          { $project : { _id : 0, postTitle : 1, postBody : 1,author : 1, score: 1, numComments : 1, searchScore: 1} },
          {
            $sort: {
              [sortField]: -1 
            }
          },
          {$limit:10}
        ]).toArray();

        //random 
        // Count the total number of documents in the collection
        const totalDocuments = await post.countDocuments();
        // Generate a random number within the range of document indices
        const randomIndex = Math.floor(Math.random() * totalDocuments);
        // Query the database to retrieve a random document using the random index
        const randomObject = await post.find().skip(randomIndex).limit(1).toArray();
        
        if (sortMethod === 'random'){
          res.send(randomObject);
        } else {
          res.send(projected_out);
        }
        
        
        //res.send(randomObject);

       
      };
      //receiving serach criteria from the client
      app.use("/sendSearch", getSearchCrit);
    });
  } 
  catch(error) {
    console.error("error::");
    console.log(error);
  }
  finally {
    await client.close();
  }
}

run();

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}

async function getRandomObject(){
          const database = client.db("reddit_posts");
          const post = database.collection("helpfulRedditPosts");

        
}