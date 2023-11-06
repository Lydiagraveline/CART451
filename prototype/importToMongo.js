const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';

const app = express();
const port = process.env.PORT || 3000;

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static('public')); // Serve static files (e.g., HTML and CSS) from the 'public' directory

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>JSON File Upload and Display</title>
    </head>
    <body>
      <h1>Upload a JSON file</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="jsonFile" accept=".json" />
        <input type="submit" value="Upload and Display JSON" />
      </form>
    </body>
    </html>
  `);
});

app.post('/upload', upload.single('jsonFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read the uploaded JSON file
  const filePath = path.join(__dirname, 'uploads', req.file.originalname);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the uploaded file.');
    }

    try {
            // Parse the JSON data
        const jsonData = JSON.parse(data);

            // Check if jsonData is an array
      // Check if jsonData has the expected structure
      if (!jsonData.topics_your_topics || !Array.isArray(jsonData.topics_your_topics)) {
        return res.status(400).send('The JSON data does not have the expected structure.');
      }
      // Extract and display the "value" of each string_map_data.Name.value
      const values = jsonData.topics_your_topics.map(item => {
        if (item.string_map_data && item.string_map_data.Name && item.string_map_data.Name.value) {
          return item.string_map_data.Name.value;
        }
        return null;
      });

      // Filter out any null values
      const filteredValues = values.filter(value => value !== null);

      res.json(filteredValues);

         // console.log(jsonData);
        // res.json(jsonData);
         //res.json(values);
    } catch (parseError) {
        return res.status(400).send('Error parsing the JSON data.');
    } 

    // Parse and display the JSON data
   // const jsonData = JSON.parse(data);

   //const values = jsonData.map(item => item.string_map_data);



    //res.json(jsonData);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// const fs = require('fs');
// const { MongoClient } = require('mongodb');
// const mongoURI = 'mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/';
// const http = require('http');
// const formidable = require('formidable');
// const path = require('path');

// // Database and Collection names
// const dbName = 'test_database';
// const collectionName = 'test_collection';

// async function main() {
//   try {
//     // Create an HTTP server
//     const server = http.createServer((req, res) => {
//       if (req.url === '/upload' && req.method === 'POST') {
//         const form = new formidable.IncomingForm();

//         form.parse(req, async (err, fields, files) => {
//           if (err) {
//             res.writeHead(400, { 'Content-Type': 'text/plain' });
//             res.end('File upload failed.');
//           } else {
//             // Read the uploaded file and parse it into a JavaScript object
//             const fileData = fs.readFileSync(files.upload.path, 'utf8');
//             const jsonData = JSON.parse(fileData);
//             console.log(jsonData)

//             // Extract the desired data from the JSON object
//             const extractedData = jsonData.someProperty; // Replace with the actual path to your desired data

//             // Create a MongoClient and connect to the MongoDB server
//             const client = new MongoClient(mongoURI, {});
//             await client.connect();

//             // Select the database and collection
//             const db = client.db(dbName);
//             const collection = db.collection(collectionName);

//             // Insert the extracted data into MongoDB
//             const result = await collection.insertOne({ topics_your_topics: extractedData });

//             res.writeHead(200, { 'Content-Type': 'text/plain' });
//             res.end('File uploaded to MongoDB.');

//             // Display the content of the uploaded file
//             res.write('Uploaded File Content:\n');
//             //res.write(fileData);

//             // Close the MongoDB connection
//             client.close();
//           }
//         });
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(`
//           <form action="/upload" method="post" enctype="multipart/form-data">
//             Select a JSON file to upload: <input type="file" name="upload">
//             <input type="submit" value="Upload">
//           </form>
//         `);
//       }
//     });

//     server.listen(8000, () => {
//       console.log('Server is running on http://localhost:8000/');
//     });

//   } catch (err) {
//     console.error(err);
//   }
// }

// main().catch(console.error);