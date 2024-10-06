const fs = require("fs");
const { SourceMapConsumer } = require("source-map");
const path = require("path");

// 检查文件夹是否存在
try {
  fs.accessSync('example.txt', fs.constants.R_OK);
} catch (err) {
  // uploads文件夹不存在则创建文件夹
  fs.mkdirSync(path.resolve(__dirname, "../uploads"), { recursive: true })
}

// 读取压缩代码和对应的source map
const arr = fs.readdirSync(path.resolve(__dirname, "../uploads"));
const sourceMap = {};
for (let i = 0; i < arr.length; i++) {
  fs.readFile(
    path.resolve(__dirname, "../uploads", arr[i]),
    "utf-8",
    function (err, data) {
      if (err) {
        return err;
      }
      sourceMap[arr[i]] = data;
    }
  );
}

module.exports = function handleErrorMessage(message) {
  const errorLine = message.lineno;
  const errorCol = message.colno;
  const jsName = message.source.split("/").pop();
  const sourceName = jsName + ".map";
  // 服务器因为是一直启动状态，所以如果是在启动后最新上传的文件，则需要事实进行读取对应的map文件
  if (!sourceMap[sourceName]) {
    sourceMap[sourceName] = fs.readFileSync(
      path.resolve(__dirname, "../uploads", sourceName),
      "utf-8"
    );
  }
  SourceMapConsumer.with(sourceMap[sourceName], null, (consumer) => {
    // 在源码堆栈中定位报错位置
    const originalPosition = consumer.originalPositionFor({
      line: errorLine,
      column: errorCol,
    });

    console.log("Error occurred at:");
    console.log("file:" + originalPosition.source);
    console.log("line:" + originalPosition.line);
    console.log("column:" + originalPosition.column);
    console.log("message:" + message.message);
  });
};

// errorAnalysisJueJinDemo
