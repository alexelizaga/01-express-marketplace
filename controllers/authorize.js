const { response } = require('express');

const redirect = ( req, res = response ) => {
    const responseType = req.query.response_type;
    const clientId = req.query.client_id;
    const redirectUri = req.query.redirect_uri;
    const scope = req.query.scope;
    const idTokenHint = req.query.id_token_hint;

    const jws = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpcXVpamFkMiIsInJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwiaXNzIjoiVm9kYWZvbmVEWEwiLCJleHAiOjE2Mjk2MTc2OTEsInVzZXJQcm9maWxlIjp7Imxhc3RQYXNzQ2hhbmdlRGF0ZSI6MCwibmFtZSI6IlFVSUpBREEsIElTTUFFTCIsImlzQWRtaW4iOnRydWUsInByZXBhaWQiOmZhbHNlfX0.mAPa9Kq9QS4JzRUb1liu-mSPKt7nb94aISy0lYqzXE-3E1_E6S2Gbl-b28Y39kNIa0rhiNYIpRENqKwO5Wt3EhHS0UcRQCLQVP9uU8y0N14Zw3C1X-DyHu1xyiWYQjAOtz87fNT18vQYcAyTwgC5pcfMo-mGhwhtMe0ZaVrOUelprGpT0c3kXbQ-nAPnpQoDwqiktEoo-3OahVMPuulduN5WWLkUd5-ckcLl1Ys_8HikTt9FX2pMkRIqr8Pb6tX-AMbN50TzWJuHMa50eAL4bYcoWOerwRHqUuBIn9L9XB5kWTcCB1N7RxnALe23VOHIc2ko2jTXE-rWJGMO9u1zcw'

    if(responseType !== 'code' || clientId !== 'marketplace' || scope !== 'OPENID' || !idTokenHint) {
        res.status(400).json({
            ok: false,
            responseType,
            clientId,
            redirectUri,
            scope,
            idTokenHint
        });
    };

    if (!redirectUri || redirectUri === 'marketplace') {
        res.status(301).redirect(`https://tsmarketplacedemo.web.app?at=${idTokenHint}&jws=${jws}`);
    };

    res.status(301).redirect(`https://tsmarketplacedemo.web.app/${redirectUri}?at=${idTokenHint}&jws=${jws}`);
}

module.exports = {
    redirect
}