const express = require('express');
const router  = express.Router();

const {transfer} = require('./helper');

transfer(router, [
    {
        come: '/sample',
        to: '/sample'
    }
]);

module.exports = router;