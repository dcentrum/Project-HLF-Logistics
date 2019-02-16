//SPDX-License-Identifier: Apache-2.0

var vehicle = require('./controller.js');

module.exports = function(app){

  app.get('/query_vehicle/:id', function(req, res){
    vehicle.query_vehicle(req, res);
  });
  app.get('/get_history_vehicle/:id', function(req, res){
    vehicle.get_history_vehicle(req, res);
  });
  app.get('/add_vehicle/:vehicle', function(req, res){
    vehicle.add_vehicle(req, res);
  });
  app.get('/get_all_vehicles', function(req, res){
    vehicle.get_all_vehicles(req, res);
  });
  app.get('/change_owner/:owner', function(req, res){
    vehicle.change_owner(req, res);
  });
  app.get('/update_insurance/:owner', function(req, res){
    vehicle.update_insurance(req, res);
  });
}
