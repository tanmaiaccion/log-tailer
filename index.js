/**
 * set environment variables
 */
require("dotenv").config();

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const logger = require("./logger");
const fs = require("fs");

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  logger.info("client connected");
});

require("./tail")(io);

server.listen(process.env.APP_PORT, "0.0.0.0");

/**
 * simulate initial file data
 */
let i = 0;
while (i < 30) {
  logger.info(
    "In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced. Wikipedia"
  );
  i++;
}

setInterval(() => {
  logger.info(`new message at ${new Date()}`);
}, 2000);
