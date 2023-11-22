const express = require('express'); 

const app = express();
const PORT = 3000;

app.use(express.static('public'));

 app.get('/api', async (req, res) => {
  const apiUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';
  const queryParams = req.query;
  try {
    const apiResponse = await fetch(`${apiUrl}?${new URLSearchParams(queryParams)}`);
    const data = await apiResponse.text();
    res.send(data);
  } catch {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }

 });

 app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});