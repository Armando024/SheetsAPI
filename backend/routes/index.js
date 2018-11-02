/*Express.js */
var express = require('express');
var router = express.Router();
/*Google API */
const {google} = require('googleapis');

/* getting API key Please provide your own API key*/
require('dotenv').config()
var auth=process.env.APIKEY;
/* End of getting APIKEY*/

/* Initiating google API variables*/
var sheets = google.sheets('v4');
var sheets = google.sheets({version: 'v4', auth});


/* GET Original data */
router.get('/', function(req, response, next) {
  sheets.spreadsheets.values.get({
    spreadsheetId: '1i2qbKeasPptIrY1PkFVjbHSrLtKEPIIwES6m2l2Mdd8',
    range: 'Sheet1!A2:E',
  }, (err, res) => {
    if (err)  console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        response.json(JSON.stringify(rows,null,2));
    } else {
      console.log('No data found.');
    }
  });

});

//get data and sort in 
router.get('/sort',function(req,response,next){
/*I decided to fetch the data again in case there where any changes done in the google sheet */
  sheets.spreadsheets.values.get({
    spreadsheetId: '1i2qbKeasPptIrY1PkFVjbHSrLtKEPIIwES6m2l2Mdd8',
    range: 'Sheet1!A2:E',
  }, (err, res) => {
    if (err)  console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        //rows is a 2d array
        rows.sort(function(a,b){
            return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
        });
        response.json(JSON.stringify(rows,null,2));
    } else {
      console.log('No data found.');
    }
  });
});


router.get('/sortDes',function(req,response,next){
/*I decided to fetch the data again in case there where any changes done in the google sheet */
  sheets.spreadsheets.values.get({
    spreadsheetId: '1i2qbKeasPptIrY1PkFVjbHSrLtKEPIIwES6m2l2Mdd8',
    range: 'Sheet1!A2:E',
  }, (err, res) => {
    if (err)  console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        //rows is a 2d array
        rows.sort(function(a,b){
            return b[0].toLowerCase().localeCompare(a[0].toLowerCase());
        });
        response.json(JSON.stringify(rows,null,2));
    } else {
      console.log('No data found.');
    }
  });
});


module.exports = router;

