const CoinbaseClient = require('coinbase').Client;

const apiKey = 'd5a205af9c260fb6f1a92e366cf6e4fad594e664dc5ddc13a1e749f34f507ed2';
const apiSecret = '737922b19d906514791c5eacb9acc67941592c038cc679aaf16f9e7a81c6a276';

const client = new CoinbaseClient({
    apiKey: apiKey,
    apiSecret: apiSecret,
});

const getExchangeRates = (currency) => {
    return new Promise((resolve, reject) => {
        client.getExchangeRates({ currency }, function (err, rates) {
            if (err) {
                reject(err);
            } else {
                resolve(rates);
            }
        });
    });
};

module.exports = { getExchangeRates };