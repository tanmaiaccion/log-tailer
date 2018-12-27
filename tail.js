const fs = require("fs");
const filePath = "/usr/src/logs/access.log";

module.exports = io => {
  let startByte = 0;

  fs.stat(filePath, (err, stats) => {
    if (err) throw err;
    startByte = stats.size;
  });

  let fsWait = false;
  fs.watch(filePath, (event, filename) => {
    if (filename) {
      if (fsWait) return;
      fsWait = setTimeout(() => {
        fsWait = false;
      }, 100);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        fs.createReadStream(filePath, {
          start: startByte,
          end: stats.size
        }).addListener("data", lines => {
          io.sockets.emit("log-change", lines.toString());
          startByte = stats.size;
        });
      });
    }
  });
};
