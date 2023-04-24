// global imports
const express = require('express');
const router = express.Router();

// local imports
const controllers = require('./controllers');

// config
const routes = {
  getProfiles: '/profiles',
  getProfileById: '/current/:id',
  createNewProfile: '/profile',
  deleteProfileById: '/profile/:id'
};

// main
router.get('/', (request, response) => {
  response.send("Hello from Ali's router!");
});

router.get(routes.getProfiles, controllers.getProfiles);
router.get(routes.getProfileById, controllers.getProfileById);
router.post(routes.createNewProfile, controllers.createNewProfile);
router.delete(routes.deleteProfileById, controllers.deleteProfileById);

module.exports = {
  router
};