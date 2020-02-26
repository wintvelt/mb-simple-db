const { response } = require('./src/helpers-api');
const { putPromise, getFile, deletePromise } = require('./src/s3functions');
const { bucketName, internalFolder } = require('./src/SECRETS');

exports.lambdaHandler = async (event) => {
    const { filename, id } = event.pathParameters;
    const requestHasId = !!id;
    switch (event.httpMethod) {
        case 'POST': {
            const data = event.body;
            const oldFile = await getFile(internalFolder + '/' + filename, bucketName);
            const oldHasid = oldFile.find(it => it.id === id);
            const newFile = requestHasId ?
                oldHasid ?
                    oldFile.map(it => it.id === id ? { id, data } : it)
                    : [...oldFile, { id, data }]
                : data;
            const output = await putPromise({
                Bucket: bucketName,
                Key: internalFolder + '/' + filename,
                Body: JSON.stringify(newFile),
                ContentType: 'application/json'
            });
            return response(200, output);
        }
        case 'GET': {
            const getResult = await getFile(internalFolder + '/' + filename, bucketName);
            const output = requestHasId ?
                getResult.find(it => it.id === id)
                : getResult
            return response(200, output);
        }
        case 'DELETE': {
            const oldFile = await getFile(internalFolder+'/'+filename, bucketName);
            const newFile = oldFile.filter(it => it.id !== id);
            const hasNewFile = newFile && newFile.length > 0;
            const writeResult = (requestHasId && hasNewFile) ?
                await putPromise({
                    Bucket: bucketName,
                    Key: internalFolder + '/' + filename,
                    Body: JSON.stringify(newFile),
                    ContentType: 'application/json'
                })
                : await deletePromise({
                    Bucket: bucketName,
                    Key: internalFolder + '/' + filename
                });
            return response(200, writeResult);
        }
        case 'OPTIONS': {
            return response(200, 'ok');
        }
        default: {
            return response(403, 'invalid request');
        }
    }
};
