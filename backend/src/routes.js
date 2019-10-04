const express = require('express');

const routes = express.Router();

const SessionController = require('./controller/SessionController');
const SpotController = require('./controller/SpotController');

routes.post('/sessions', SessionController.store);
routes.post('/spots', SpotController.store);

module.exports = routes;