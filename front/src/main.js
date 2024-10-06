import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import * as stackTraceParser from 'stacktrace-parser';

const app = createApp(App)
app.use(store).use(router).mount('#app')

if (process.env.NODE_ENV == "production") {
  app.config.errorHandler = function (err, vm, info) {
    const errInfo = stackTraceParser.parse(err.stack)[0]
    const message = err.message
    const lineno = errInfo.lineNumber
    const colno = errInfo.column
    const source = errInfo.file
    axios
      .post("http://127.0.0.1:3000/sendErrorLog", {
        message,
        lineno,
        colno,
        source,
      })
      .then((data) => {
        console.log(data);
      });
  };

  window.onerror = function(message, source, lineno, colno) {
    axios
        .post("http://127.0.0.1:3000/sendErrorLog", {
          message,
          lineno,
          colno,
          source,
        })
        .then((data) => {
          console.log(data);
        });
  }

}

