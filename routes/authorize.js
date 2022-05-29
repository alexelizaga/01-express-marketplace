/*
    host + /v1/authorize
*/

const { Router } = require('express');
const router = Router();

const { redirect } = require('../controllers/authorize');

router.get('/', redirect);

module.exports = router;