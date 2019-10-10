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

app.get('/stake', async (req, res) => {
  let data = await getJormungandrRest('stake');
  res.send(JSON.stringify(data));
});

app.get('/transactions', async (req, res) => {
  let data = await getJormungandrRest('utxo');
  res.send(JSON.stringify(data));
});

app.get('/nodestats', async (req, res) => {
  let data = await getJormungandrRest('node/stats');
  res.send(JSON.stringify(data));
});

app.get('/fragmentlogs', async (req, res) => {
  let data = await getJormungandrRest('fragment/logs');
  res.send(JSON.stringify(data));
});

app.get('/leaders', async (req, res) => {
  let data = await getJormungandrRest('leaders');
  res.send(JSON.stringify(data));
});

server.listen(querynodePort, querynodePublicAddress);
