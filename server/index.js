const handleErrorMessage = require("./utils/index");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs')
const path = require('path')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/upload", bodyParser.json({ type: 'application/octet-stream', limit: "100mb" }), (req, res) => {
  const form = req.body;
  fs.writeFile(path.resolve(__dirname, './uploads', form.fileName), form.file, (err) => {
    if (err) {
      res.status(500).send("保存文件时发生错误。");
    } else {
      res.status(200).send("文件上传成功。");
    }
  });
});

app.post("/sendErrorLog", (req, res) => {
  handleErrorMessage(req.body);
  res.send("hello");
});

app.listen(3000, () => {
  console.log("server at 3000 port");
});
