const port = process.env[`SERVER_PORT`] || 4000;
const websocketServerUrl = process.env[`WEBSOCKET_SERVER_BASE_URL`] || `http://localhost:8090`;
const path = require(`path`);

const express = require(`express`);
const app = express();

app.use(express.static(path.join(__dirname, `../client/public`)));
app.use(express.static(path.join(__dirname, `../client/build`)));
app.get(`/websocketServerUrl`, (req, res) => {
    res.send(websocketServerUrl);
});
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});
