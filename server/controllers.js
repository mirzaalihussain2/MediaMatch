const { profileCollection, chatCollection } = require('./db');

// POST / PUT Function: SAVE user's profile to DB

// Create new user in DB
async function createNewProfile (request, response) {
  try {
    const newProfile = {
      name: request.body.fullName,
      dob: request.body.dob,
      gender: request.body.gender,
      musicGenres: request.body.musicGenres
    };
    const createdNewProfile = await (new profileCollection(newProfile)).save();
    response.status(201).json(createdNewProfile);
  } catch (error) {
    console.log(`controllers.js: createNewProfile error - ${error}`);
    response.status(500).send(`Create New Profile error`);
  }
};

// GET Function: RETURN current user's profile
    // FindbyId
async function getProfileById (request, response) {
  try {
    const userProfile = await profileCollection.findById(request.params.id);
    response.status(200).json(userProfile);
  } catch (error) {
    console.log(`controllers.js: getProfileById error - ${error}`);
    response.status(500).send(`Get Profile By Id error`);
  }
};

// GET Function: RETURN array of user profiles
    // that aren't me
    // that I haven't already liked, rejected or matched with
    // that haven't rejected me
    // that are filtered by my dating preferences

    // Find all, filter by params
async function getProfiles (request, response) {
  try {
    const profilesArray = await profileCollection.find({});
    response.status(200).json(profilesArray);
  } catch (error) {
    console.log(`controllers.js: getProfiles error - ${error}`);
    response.status(500).send(`Get Profiles error`);
  }
};

// DELETE function: Delete user profile by Id
async function deleteProfileById (request, response) {
  try {
    const deletedProfile = await profileCollection.findByIdAndDelete(request.params.id);
    response.status(200).json(deletedProfile);
  } catch (error) {
    console.log(`controllers.js: deleteProfileById error - ${error}`);
    response.status(500).send(`Delete Profiles error`);
  }
};

// // LIKE a user
// async function likeProfile (request, response) {
//   try {
//     await profileCollection.findByIdAndUpdate(request.params.id, { li })

//   } catch (error) {
//     console.log(`controllers.js: likeProfile error - ${error}`);
//     response.status(500).send(`Like Profile error`);
//   }
// }

// // Reject a user
// go to current user, add X userID to their liked array


module.exports = {
  getProfiles,
  getProfileById,
  createNewProfile,
  deleteProfileById
};

