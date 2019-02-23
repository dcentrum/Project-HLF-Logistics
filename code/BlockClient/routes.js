//SPDX-License-Identifier: Apache-2.0

var vehicle = require('./controller.js');

module.exports = function(app){

  app.get('/get_shipment/:id', function(req, res){
    vehicle.get_shipment(req, res);
  });
  app.get('/get_package/:id', function(req, res){
    vehicle.get_package(req, res);
  });
  app.get('/add_package/:package', function(req, res){
    vehicle.add_package(req, res);
  });
  app.get('/add_shipment/:shipment', function(req, res){
    vehicle.add_shipment(req, res);
  });
  app.get('/get_all_shipments', function(req, res){
    vehicle.get_all_shipments(req, res);
  });
}
