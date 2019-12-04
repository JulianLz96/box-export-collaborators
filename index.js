const request = require('request');
const boxSDK = require('box-node-sdk');
const fs = require('fs');
const sdkConfig = require('./config.json');

const developer_token = '';

let sdk = new boxSDK({
    clientID: '',
    clientSecret: ''
})

let client = sdk.getBasicClient(developer_token);

function getFolders(client) {
    client.get('/folders/0').then(response => {
        let folder_sekk = response.body.item_collection.entries.filter((i) => {
            return i.name == 'Box Reports';
        });
        console.log(folder_sekk[0].id);

        client.get('/folders/' + folder_sekk[0].id + '/collaborations').then(response => {
            console.log(response.body);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
        console.log('Error response');
    });
}

getFolders(client);