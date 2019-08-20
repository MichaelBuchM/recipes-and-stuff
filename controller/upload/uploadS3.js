const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const config = require('../../lib/config/config');

aws.config.update({
    accessKeyId: config.GetEnvironmentVariable('AWS_ACCESS_KEY_ID'),
    secretAccessKey: config.GetEnvironmentVariable('AWS_SECRET_ACCESS_KEY'),
    region: config.GetEnvironmentVariable('AWS_REGION')
});

let s3 = new aws.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.BucketName(),
        key: function (req, file, cb) {
            let fileExtension = file.originalname.substring(file.originalname.indexOf('.'), file.originalname.length)
            cb(null, `${req.body.category}/${req.body.name}/${req.body.name}${fileExtension}`);
        }
    })
});

module.exports = {
    uploadS3: () => upload
};
