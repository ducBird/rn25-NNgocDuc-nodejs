var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Welcome to my WebApp');
});

// POST method
router.post('/', function (req, res, next) {
  const { username, password } = req.body;
  res.send(username);
  res.send('ok');
});

module.exports = router;
