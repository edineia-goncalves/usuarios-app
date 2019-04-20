const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  app = express();
service = require("./service");

app.use(cors());
app.use(bodyParser.json());

app.get("/getUsers", (req, res) => {
  res.send(service.GetUsers());
});

app.delete("/deleteUser/:userId", (req, res) => {
  if (service.DeleteUser(req.params.userId)) {
    res.send(200);
  } else {
    res.send(500);
  }
});

app.post("/postUser", (req, res) => {
  if (service.SaveUser(req.body)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.listen(3100, _ => console.log("Rodando"));
