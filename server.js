import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';

import { receiveText } from "./app/index.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! tedaa awesomeee!!!!");
});

app.post("/receive", async (req, res) => {
  const { body } = req;
  await receiveText(body);

  return res.send().status(200);
});

// app.post("/receive-and-return-message", async (req, res) => {
//   const { body } = req;
//   const message = await receiveMessage(body);

//   res.set("Content-Type", "text/xml");
//   return res.send(message.toString()).status(200);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

