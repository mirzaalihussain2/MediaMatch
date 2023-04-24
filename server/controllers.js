const { profileCollection, chatCollection } = require('./db');

// POST / PUT Function: SAVE user's profile to DB

// $where: this.liked.includes(currentUserId)
// LIKE another user

// update the current user's LIKE array with the viewed user's UUID
// check if the viewed user's LIKE array has the current user's UUID in it
// if it does -

async function likeProfile (request, response) {
  try {
    // Required arguments from request body
    const likerId = request.body.liker;
    const likeeId = request.body.likee;

    // Retrieve LIKER from DB
    const liker = await profileCollection.findById(likerId);
    const likee = await profileCollection.findById(likeeId);

    const liker = await profileCollection.findById(request.body.liker);
    const likee = await profileCollection.findById(request.body.likee);

    // If LIKEE's UUID not in LIKER'S LIKED array, push LIKEE's UUID into LIKER'S LIKED array
    if (!(liker.liked).includes(likeeId)) {
      liker.liked.push(likeeId);
    };

    // If LIKEE's UUID not in LIKER'S LIKED array, push LIKEE's UUID into LIKER'S LIKED array
    if (!(liker.liked).includes(likee._id)) {
      liker.liked.push(likee._id);
    };


    // If LIKEE is in LIKER's REJECTED array, remove the LIKEE from the LIKER's REJECTED array
    if ((liker.rejected).includes(likeeId)) {
      const index = (liker.rejected).indexOf(likeeId);
      liker.rejected = (liker.rejected).splice(index, 1)
    };

    if ((liker.rejected).includes(likee._id)) {
      const index = (liker.rejected).indexOf(likee_.id);
      liker.rejected = (liker.rejected).splice(index, 1)
    };


    // If LIKER is in LIKEE's LIKED array,
    const mutualLike = await profileCollection.exists({
      _id: likeeId,
      liked: likerId
    });

    // If LIKER is in LIKEE's LIKED array,
    const mutualLike = await profileCollection.exists({
      _id: likee._id,
      liked: liker._id
    });


    if (mutualLike) {
      // If LIKEE's UUID not in LIKER's MATCHED array, push LIKEE's UUID to LIKER's MATCHED array
      if (!(liker.matched).includes(likeeId)) {
        liker.matched.push(likeeId);
      }

      // If LIKER's UUID not in LIKEE'S MATCHED array, push LIKER's UUID to LIKEE's MATCHED array
      if (!(likee.matched).includes(likerId)) {
        likee.matched.push(likerId);
      }
    }


    console.log(mutualLike);

    // Save LIKER to collection
    const likerAfterLiking = await liker.save();
    response.status(201).json(likerAfterLiking);

  } catch (error) {
    console.log(`controllers.js: likeProfile error - ${error}`);
    response.status(500).send(`Like Profile error`);
  }
};



async function doesLikedUserLikeCurrentUser (request, response) {
  try {
    const viewedUserId = request.params.id;
    const matchedUserId = await profileCollection.exists({
      _id: viewedUserId,
      liked: currentUserId
    });
    console.log(matchedUserId)
    response.status(200)
  } catch (error) {
    console.log(`controllers.js: likeProfile error - ${error}`);
    response.status(500).send(`Like Profile error`);
  }
};

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

// Reject a user
//go to current user, add X userID to their liked array


module.exports = {
  getProfiles,
  getProfileById,
  createNewProfile,
  deleteProfileById,
  likeProfile
};

