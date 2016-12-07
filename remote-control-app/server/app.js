const port = process.env[`SERVER_PORT`] || 5000;
const path = require(`path`);

const express = require(`express`);
const app = express();

app.use(`/css`, express.static(path.join(__dirname, `../client/public/css`)));
app.use(`/fonts`, express.static(path.join(__dirname, `../client/public/fonts`)));
app.use(`/js`, express.static(path.join(__dirname, `../client/build`)));
app.use(`/js`, express.static(path.join(__dirname, `../client/public/js`)));
app.get(`/*`, (req, res) => {
    res.sendFile(path.join(__dirname, `../client/public/index.html`));
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});
