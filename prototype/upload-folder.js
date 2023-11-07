// const express = require('express');
// const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// app.use(fileUpload());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post('/upload', (req, res) => {
//   if (!req.files || !req.files.directory) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const uploadedDir = req.files.directory;
//   const uploadPath = __dirname + '/uploads/';

//   uploadedDir.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     const directoryPath = `${uploadPath}${uploadedDir.name}/your_topics/`;
//     const jsonFilePath = `${directoryPath}your_topics.json`;

//     if (!fs.existsSync(directoryPath) || !fs.existsSync(jsonFilePath)) {
//       return res.status(400).send('Folder or JSON file not found in the uploaded directory.');
//     }

//     // Read the JSON file and do whatever you want with it
//     const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
//     res.send(jsonData);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//// above ---> upload-folder.html (not finished) /////

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
