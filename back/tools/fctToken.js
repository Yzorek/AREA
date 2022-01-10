const jwt = require('jsonwebtoken');
const settings = require('../config/token.json').settings;

function generateToken(id) {
    return jwt.sign({id: id}, settings.secretKey, { expiresIn: settings.expiresIn });
}

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

function getTokenData(req) {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    try {
        let response = jwt.verify(token, settings.secretKey);
        return (response)
    } catch (e) {
        console.log("ERROR => ", e)
        return null;
    }
}

function auth(req, res, next) {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    jwt.verify(token, settings.secretKey, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

module.exports = {
    generateToken,
    auth,
    getTokenData,
}