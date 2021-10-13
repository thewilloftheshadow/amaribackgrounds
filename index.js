const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/*", function (req, res) {
  res.sendStatus(200)
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(process.env.PORT);
console.log("AmariBackgrounds has been started, port " + process.env.PORT)