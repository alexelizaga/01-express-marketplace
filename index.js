const express = require('express');

const app = express();

// uriHome: 'marketplace'
// http://localhost:4000/v1/authorize?response_type=code&client_id=marketplace&scope=OPENID&id_token_hint=aaaabbbbccccdddd
// http://localhost:4000/v1/authorize?response_type=code&client_id=marketplace&redirect_uri=marketplace&scope=OPENID&id_token_hint=aaaabbbbccccdddd

// uriPurchase: 'shoppingcard'
// http://localhost:4000/v1/authorize?response_type=code&client_id=marketplace&redirect_uri=shoppingcard&scope=OPENID&id_token_hint=aaaabbbbccccdddd

app.get('/v1/authorize', (req, res) => {
    const responseType = req.query.response_type;
    const clientId = req.query.client_id;
    const redirectUri = req.query.redirect_uri;
    const scope = req.query.scope;
    const idTokenHint = req.query.id_token_hint;

    if(responseType !== 'code' || clientId !== 'marketplace' || scope !== 'OPENID' || !idTokenHint) {
        res.json({
            ok: false,
            responseType,
            clientId,
            redirectUri,
            scope,
            idTokenHint
        });
    };

    if (!redirectUri || redirectUri === 'marketplace') {
        res.status(301).redirect(`https://tsmarketplacedemo.web.app?at=${idTokenHint}`);
    };

    res.status(301).redirect(`https://tsmarketplacedemo.web.app/${redirectUri}?at=${idTokenHint}`);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});