const portNumber = 4200;

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express(); //make an instance of express
const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';
const client = new MongoClient(mongoURI, {});

app.use(express.static('public'));

app.get('/data', async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('PersonalData');
    const hinge = db.collection('hinge_matches');
    const hingeMatches = await hinge.find({}).toArray();
    res.json(hingeMatches);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).send('Error fetching data');
  } finally {
    if (client !== null) {
      client.close();
    }
  }
});
app.listen(portNumber, () => {
    console.log("Server is running on port "+portNumber);
  });