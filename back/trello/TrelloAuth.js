const OAuth = require('oauth').OAuth,
    /* For tokenKeypair caching a better solution is an in-memory db like radis. In this case I used mongodb. Not a nice solution but it surfices for demo purpose */
    db = new (require('./db')),
    appConfig = require('./appConfig');

const trelloAuthUrls = module.exports.trelloAuthUrls = {
    requestURL: "https://trello.com/1/OAuthGetRequestToken",
    accessURL: "https://trello.com/1/OAuthGetAccessToken",
    authorizeURL: "https://trello.com/1/OAuthAuthorizeToken",
};

const cacheRequestTokenSecretPair = module.exports.cacheRequestTokenSecretPair = function (token, secret) {
    return db.cacheToken(token, secret)
};

const cacheAccessTokenSecretPair = function (tokenSecret, accessToken, accessTokenSecret) {

    if (oauthTokenSecrPair) {
        oauthTokenSecrPair.accToken = accessToken,
            oauthTokenSecrPair.accTokenSecret = accessTokenSecret
    }
};

const getOAuthAccessToken = function (token, tokenSecret, verifier) {
    return new Promise(function (resolve, reject) {
        oauth.getOAuthAccessToken(token, tokenSecret, verifier, function (error, accessToken, accessTokenSecret, results) {
            if (!error) {
                resolve({
                    'reqTokenSecret': tokenSecret,
                    'accessToken': accessToken,
                    'accessTokenSecret': accessTokenSecret
                });
            } else {
                reject({'error': error});
            }
        });
    });
};

oauth = module.exports.oauth = new OAuth(trelloAuthUrls.requestURL,
    trelloAuthUrls.accessURL,
    process.env.appkey,
    process.env.appSecret,
    "1.0",
    appConfig.callbackUrl, "HMAC-SHA1");

module.exports.getRequestToken = function (callback) {
    oauth.getOAuthRequestToken(callback);
};

module.exports.getAccessToken = function (query) {
    return new Promise(function (resolve, reject) {
        db.getCachedTokenByReqToken(query.oauth_token).then(function (result) {
            const token = query.oauth_token;
            const tokenSecret = result.reqTokenSecret;
            const verifier = query.oauth_verifier;
            getOAuthAccessToken(token, tokenSecret, verifier).then(function (result) {
                if (!result.error) {
                    resolve(result)
                } else {
                    reject(result);
                }
            });
        });

    });
};