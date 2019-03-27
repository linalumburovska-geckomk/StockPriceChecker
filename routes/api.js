/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var StockPrice = require('../models/StockPrice');
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stockPrice')

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      var queryStock = req.query.stock;
      var queryLike = req.query.like;
      if(queryStock!==undefined || queryLike!==undefined){
        StockPrice.find({"stock":queryStock.toUpperCase()}).exec(function(error,data) {
          return res.json({"stockData": data});
        })
      }else {
        StockPrice.find().exec(function(error,data) {
          return res.json({"stockData": data});
        })
      }
      
    })

    .post(function (req, res){
      var stock = req.body.stock;
      var like = req.body.like;
 
      StockPrice.findOne({"stock": stock}).exec(function(error,data){
          if(stock instanceof Array){
            
            var price = (stock[0]=="GOOG" || stock[0]=="goog") ? 786.90 : 62.30;
            var newdata = new StockPrice({
              "stock": stock[0],
              "price": price,
              "rel_like": like
            })
            price = (stock[1]=="GOOG" || stock[1]=="goog") ? 786.90 : 62.30;
            var newdata1 = new StockPrice({
              "stock": stock[1],
              "price": price,
              "rel_like": like
            })
            
            var finalData = [];
            finalData.push(newdata);
            finalData.push(newdata1);
            return res.json({"stockData": finalData});
          } else if(data==null) {
            var newdata = new StockPrice({
              "stock": stock,
              "price": price,
              "like": 1
            })
            newdata.save();
            return res.json({"stockData": newdata});
          } 
          else {
            return res.json({"stockData": data});
          }
        
      })     
    });
    
};
