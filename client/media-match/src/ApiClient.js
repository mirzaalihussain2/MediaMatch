// config
const BASEURL = 'http://127.0.0.1:3001';
const routes = {
  getProfiles: '/profiles',
  getProfileById: '/current/:id',
  createNewProfile: '/profile',
  deleteProfileById: '/profile/:id'
};

// main function
function fixDate (profile) {
  profile.dob = new Date(profile.dob);
  return profile;
};

async function getProfileByid () {};

async function getProfiles () {
  const response = await fetch(BASEURL + routes.getProfiles, {
    method: "GET"
  });
  const profiles = await response.json();
  console.log(profiles);
  return profiles;
};

async function createNewProfile (data) {
  const response = await fetch(BASEURL + routes.createNewProfile, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(data)
  });
  const profile = await response.json();
  return fixDate(profile);
};

// exports
module.exports = {
  fixDate,
  getProfiles,
  getProfileByid,
  createNewProfile
};

