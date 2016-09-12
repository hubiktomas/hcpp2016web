require('dotenv').config({silent: true});
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  mc.lists.subscribe({
    id: req.body.list_id,
    email: {
      email: req.body.email
    }},
    function(data) {
      res.redirect('/?subscribe=success');
    },
    function(error) {
      var errorMsg;
      if (error.error) {
        console.log(error.code + ": " + error.error);
        errorMsg = error.error;
      }
      res.redirect('/?subscribe=error&msg=' + errorMsg)
    });
});

module.exports = router;
