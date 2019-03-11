const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const axios = require('axios');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {

    console.log("Listening to Port " + port);
});

app.post("/translate", function(req, res){

    axios.get(process.env.API_URL, {
        params: {
          q: req.body.text,
          source: req.body.source,
          target: req.body.target,
          key: process.env.API_KEY
        }
      })
      .then(function (response) {
        res.send(response.data.data.translations[0].translatedText);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      }); 


});
