'use strict';

module.exports = {
    GetEnvironmentVariable: (variableName) => getEnvironmentVariable(variableName),
    BucketName: () => 'recipes-and-stuff',
    BucketKey: () => 'recipes.json',
};

function getEnvironmentVariable (variableName) {
    if (process.env[variableName]) {
        return process.env[variableName];
    }
    throw new Error(`Required env var ${variableName} is not set.`);
}
