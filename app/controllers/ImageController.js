'use strict';

var Jimp = require('jimp');
const ControllerCommon = require('./common/controllerCommon');

class ImageController {

    constructor() {

        this.common = new ControllerCommon();
    }
    rotate(req, res) {
        let angle = req.params.angle;

        if (angle == null) {
            angle = 0;
        }
        angle = angle.replace('.png', '');
        Jimp.read('./es6/image/logo.png', (err, image) => {
            image.rotate(parseFloat(angle)).quality(100).getBufferAsync(Jimp.MIME_PNG).then(data => {
                res.contentType('image/png');
                res.end(data, 'binary');
            }).catch(this.common.findError(res));
        });
    }

}
module.exports = ImageController;