const pluginName = "SendMapWebpackPlugin";
const fs = require("fs");
const axios = require("axios");
const path = require('path')

class SendMapWebpackPlugin {
  apply(compiler) {
    const outputPath = compiler.options.output.path;
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      console.log("webpack 构建");
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV == "production") {
        fs.readdir(outputPath + "/js", function (err, data) {
          if (data) {
            data.forEach((v) => {
              // 如果读取到的数据是以map结尾，则将map文件上传到服务器
              if (v.endsWith(".map")) {
                const file = fs.readFileSync(
                  path.resolve(__dirname, "../dist/js", v),
                  "utf-8"
                );
                axios({
                  url: "http://127.0.0.1:3000/upload",
                  method: "post",
                  data: { file, fileName: v },
                  headers: {
                    "Content-Type": "application/octet-stream",
                  },
                })
                  .then((res) => {
                    console.log("success");
                    fs.rm(path.resolve(__dirname, "../dist/js", v), (err) => {
                      if(err) {
                        console.log(err)
                        return
                      }
                      console.log('delete success')
                    })
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          }
        });
      }
    });
  }
}

module.exports = SendMapWebpackPlugin;
