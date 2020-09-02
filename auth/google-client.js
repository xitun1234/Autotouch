const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = "token.json";

class Authentication{
    authenticate(){
        return new Promise((resolve, reject) =>{
            let credentials = this.getClientSecret();
            let authorizePromise = this.authorize(credentials);
            authorizePromise.then(resolve, reject);
        });
    }

    getClientSecret(){
        return require('../config/credentials.json');
    }

    authorize(credentials){
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];

        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

        return new Promise((resolve, reject) =>{
            fs.readFile(TOKEN_PATH, (err, token) =>{
                if (err){
                    this.getNewToken(oAuth2Client).then((oAuth2ClientNew) =>{
                        resolve(oAuth2ClientNew);
                    }, (err) =>{
                        reject(err);
                    });
                } else{
                    oAuth2Client.setCredentials(JSON.parse(token));
                    resolve(oAuth2Client);
                }
            });
        });
    }
    getNewToken(oAuth2Client, callback){
        return new Promise((resolve, reject) =>{
            var authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });
            console.log(`Authorize this app by visiting this url: ${authUrl}`);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Enter the code from that page here: ', (code) =>{
                rl.close();
                oAuth2Client.getToken(code, (err, token) =>{
                    if (err){
                        console.log('Error while trying to retrieve access token', err);
                        reject();
                    }
                    oAuth2Client.setCredentials(token);
                    this.storeToken(token);
                    resolve(oAuth2Client);
                });
            });
        });  
    }
    storeToken(token){
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) =>{
            if (err) return console.error(err);
            console.log(`Token stored to ${TOKEN_PATH}`);
          });
    }
}

module.exports = new Authentication();