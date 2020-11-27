var express = require('express');
var router = express.Router();
const authService = require('../services/auth.service');


/* GET home page. */
router.get('/log-in', function(req, res, next) {
  res.render('auth/log-in', { title: 'Express' });
});

// Returns JSON, the page can make an ajax call to authorize
// Or this can be used as an API endpoint.
router.post('/log-in', async function(req, res, next) {
    const request = req.body;
    const result = await authService.authenticateLocal(request);

    return res.json(result);
});

router.get('/register', function(req, res, next) {
    res.render('auth/register', { title: 'Express' });
});

// Returns JSON, the page can make an ajax call to authorize
// Or this can be used as an API endpoint.
router.post('/register', async function(req, res, next) {
    const request = req.body;
    const result = await authService.registerLocal(request);
    return res.json(result);
});

module.exports = router;
