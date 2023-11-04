const portNumber = 4200;

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express(); //make an instance of express
const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';
const client = new MongoClient(mongoURI, {});

// // Serve static files from the 'public' folder
app.use(express.static('public'));

  app.get('/data', async (req, res) => {
    try {
      await client.connect();
      console.log("connected");

      const db = client.db('LydiasOnlineData');
      const collection = db.collection('advertisers');
  
      const data = await collection.find({}).toArray();
      if (data) {
        console.log(`Found ${data.length} documents`);
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data');
    } finally {
      if (client !== null) { // Check if client is not null before closing
        client.close();
      }
    }
  });



app.listen(portNumber, () => {
    console.log("Server is running on port "+portNumber);
  });