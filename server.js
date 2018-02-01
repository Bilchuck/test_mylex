const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Jimp = require("jimp");
const base64Img = require('base64-img')

const app = express();
const PORT = process.env.PORT || 8080;
// start
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT} port`);
});
// app use
app.use('/static', express.static(__dirname + '/build/static'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
// endpoints
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
app.post(`/img`, ({body: {img}}, res) => {
    img = img.split('data:image/png;base64,')[1];
    const buffer = new Buffer(img, 'base64');
    Jimp.read(buffer)
        .then(valdiateImageSize)
        .then(resizeImage)
        .then(getBuffer)
        .then(imageResponse => res.send(imageResponse))
        .catch(_ => res.send(errorResponse));
});

const errorResponse = {
    errorMessage: `Invalid image`
};
const valdiateImageSize = (image) => {
    const {bitmap: { width, height }} = image;
    if (width > 300 && height > 300 && width === height) {
        return image;
    } else {
        throw Error(`Invalid image`);
    }
}
const resizeImage = image => image.resize(300, 300);
const getBuffer = image => new Promise((resolve, reject) => {
    image.getBuffer('image/jpeg', (err, buffer) => {
        if (err) {
            reject(err);
        } else {
            resolve({
                img: toJpegBase64(buffer),
            });
        }
    });
})
const toJpegBase64 = buffer => 'data:image/jpeg;base64,' + buffer.toString('base64');
