# BTC-Address-API
REST api server to generate an HD SegWit bitcoin address from a given seed and path


## Getting Started
To get the server running locally:

* Clone this repo
* `npm install` to install all required dependencies
*  Add bin/.env.dev file as follows:
    
    `PORT=8800`

* `npm start` to start the server

* `npm test` to run the test cases (make sure the server is locally running)

## APIs :

### 1. Address Create API
* This is the API that will allow you to create an HD SegWit bitcoin address. 

Category| |
:---:|---
URL Path|/api/v1/btc/wallet/generateAddr
Method|POST

* Header Information

Category| |
:---:|:---:
Content-Type|application/json

* Request Body(json)
```json
{
  "mnemonic":"enact zoo dinosaur fatal vacuum cotton dynamic bike maid board century rigid",
  "path": "m/44'/0'/0'/0/0"
}
```
</br>

#### Response Example
```json
{
    "httpCode": 200,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "address": "bc1qk4l5c048a2md798gzh4j08aqua0gx02lttxfu2"
    }
}
```
</br>

### 2. Multisig Address Create API
* This is the API that will allow you to create an HD SegWit bitcoin address. 

Category| |
:---:|---
URL Path|/api/v1/btc/wallet/P2SHMultiSigAddr
Method|POST

* Header Information

Category| |
:---:|:---:
Content-Type|application/json

* Request Body(json)
```json
{
    "pubkeys" : 
        [
      "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
      "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
      "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
    ],
    "threshold" : 2
}
```
</br>

#### Response Example
```json
{
    "httpCode": 200,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "address": "36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7"
    }
}
```
</br>


#### NOTE: This is a sample code. Sensitive data like mnemonic should never travel over the transport layer.