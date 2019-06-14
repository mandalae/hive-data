'use strict';

const https = require('https');
const http = require('http');

module.exports = {
    'post': (path, postData) => {

        const options = {
            host: 'api-prod.bgchprod.info',
            port: 443,
            path: '/omnia/' + path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.alertme.zoo-6.6+json',
                'Accept': 'application/vnd.alertme.zoo-6.6+json',
                'X-Omnia-Client': 'Hive Web Dashboard',
                'Content-Length': JSON.stringify(postData).length
            }
        }

        return new Promise ((resolve, reject) => {
            const request = https.request(options, (response) => {
                let data = '';
                response.on('data', d => {
                    data += d;
                });

                response.on('end', () => {
                    resolve(JSON.parse(data));
                });

                response.on('error', err => {
                    reject(err);
                });
            });

            request.write(JSON.stringify(postData));
            request.end();
        });
    },
    'get': (path, sessionId) => {
        const options = {
            host: 'api-prod.bgchprod.info',
            port: 443,
            path: '/omnia/' + path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.alertme.zoo-6.1+json',
                'Accept': 'application/vnd.alertme.zoo-6.1+json',
                'X-Omnia-Client': 'Hive Web Dashboard',
                'X-Omnia-Access-Token': sessionId
            }
        }

        return new Promise ((resolve, reject) => {
            const request = https.request(options, (response) => {
                let data = '';
                response.on('data', d => {
                    data += d;
                });

                response.on('end', () => {
                    resolve(JSON.parse(data));
                });

                response.on('error', err => {
                    reject(err);
                });
            });
            request.end();
        });
    },
    'saveMetric': (postData) => {
        const options = {
            host: process.env.INFLUXDB_HOST,
            port: 8086,
            path: '/write?db=hiveData&precision=s',
            method: 'POST',
            headers: {
                'Content-Type': 'text/html',
            }
        }

        return new Promise ((resolve, reject) => {
            const request = http.request(options, (response) => {
                let data = '';
                response.on('data', d => {
                    data += d;
                });

                response.on('end', () => {
                    resolve(data);
                });

                response.on('error', err => {
                    reject(err);
                });
            });

            request.write(postData);
            request.end();
        });
    }
};
