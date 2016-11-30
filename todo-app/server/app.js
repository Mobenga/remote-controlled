const port = process.env[`SERVER_PORT`] || 4000;
const path = require(`path`);

const express = require(`express`);
const app = express();

app.use(express.static(path.join(__dirname, `../client/public`)));
app.use(express.static(path.join(__dirname, `../client/build`)));

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});
