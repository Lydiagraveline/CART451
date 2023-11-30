const portNumber = 4200;

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express(); //make an instance of express
const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';
const client = new MongoClient(mongoURI, {});
const fs = require('fs');
app.use(express.static('public'));


const fetchDataFromCollection = async (res, collectionName) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('PersonalData');
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();
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

// Endpoint for 'hinge_matches' collection
app.get('/hingeData', async (req, res) => {
  await fetchDataFromCollection(res, 'hinge_matches');
});

// Endpoint for 'instagramDM' collection
app.get('/instagramData', async (req, res) => {
  await fetchDataFromCollection(res, 'instagramDM');
});

// Endpoint for 'instagramDM' collection
app.get('/mediaData', async (req, res) => {
  await fetchDataFromCollection(res, 'media');
});

//send the hinge data
// app.get('/hingeData', async (req, res) => {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     const db = client.db('PersonalData');
//     const hinge = db.collection('hinge_matches');
//     const hingeMatches = await hinge.find({}).toArray();
//     res.json(hingeMatches);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     res.status(500).send('Error fetching data');
//   } finally {
//     if (client !== null) {
//       client.close();
//     }
//   }
// });

// //Instagram data
//    app.get('/instagramData', async (req, res) => {
//      try {
//        await client.connect();
//        const db = client.db('PersonalData');
//        const instagram = db.collection('instagramDM');
//       const inbox = await instagram.find({}).toArray();
//       res.json(inbox);
//      } catch (error) {
//        console.error("Error connecting to MongoDB:", error);
//        res.status(500).send('Error fetching data');
//      } finally {
//        if (client !== null) {
//          client.close();
//         }
//      }
//    });

 
   app.listen(portNumber, () => {
    console.log("Server is running on port "+portNumber);
  });