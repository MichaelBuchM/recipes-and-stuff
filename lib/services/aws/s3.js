'use strict';

const AWS = require('aws-sdk');
const Config = require('../../config/config');

module.exports = {
    PutObject: (bucket, key, object) => putObject(bucket, key, object),
    GetObject: (bucket, key) => getObject(bucket, key),
    HeadObject: (bucket, key) => headObject(bucket, key),
};

function getObject (bucket, key) {
    const params = {
        Bucket: bucket,
        Key: key
    };
    return initService('S3')
        .then(s3 => s3.getObject(params).promise())
        .then(content => JSON.parse(new Buffer(content.Body).toString('utf8')))
}

function putObject (s3Bucket, key, object) {
    const params = {
        Bucket: s3Bucket,
        Key: key,
        Body: JSON.stringify(object, null, 3)
    };
    return initService('S3')
        .then(s3 => s3.putObject(params).promise())
}

function headObject (bucketName, key) {
    const params = {
        Bucket: bucketName,
        Key: key
    };
    return initService('S3')
        .then(s3 => s3.headObject(params).promise())
}
function initService (service) {
    const params = {region: Config.GetEnvironmentVariable('AWS_REGION')};
    return Promise.resolve(new AWS[service](params));
}