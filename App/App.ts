import express from "express";

const port: number = 8080;
const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});