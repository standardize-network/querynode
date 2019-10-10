let http = require('http');
let fs = require('fs');
let moment = require('moment');
let axios = require('axios');
let express = require('express');

let restApiAddress = 'http://127.0.0.1:3101/api/v0/';
let querynodePublicAddress = 'YOUR-PUBLIC-IP';
let querynodePort = 5566;
let loggingEnabled = false;

const app = express()
const server = http.createServer(app)

async function getJormungandrRest(query) {
  try {
    let queryPath = `${restApiAddress}${query}`;
    let res = await axios.get(queryPath, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (loggingEnabled) {
      console.log(`${moment().format()} [GET] ${queryPath}`);
    };
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

async function createApi(path, jorApi) {
  app.get(path, async (req, res) => {
    let data = await getJormungandrRest(jorApi);
    res.send(JSON.stringify(data));
  });
}

createApi('/stake', 'stake');
createApi('/transactions', 'utxo');
createApi('/nodestats', 'node/stats');
createApi('/fragmentlogs', 'fragment/logs');
createApi('/leaders', 'leaders');

server.listen(querynodePort, querynodePublicAddress);
