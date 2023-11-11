const express = require('express'); 
//const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

 app.get('/api', async (req, res) => {
  const apiUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';
  const queryParams = req.query;
  const apiResponse = await fetch(`${apiUrl}?${new URLSearchParams(queryParams)}`);
  const data = await apiResponse.text();
  res.send(data);
 });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});