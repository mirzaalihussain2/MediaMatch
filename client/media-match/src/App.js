import React from "react";
import { useEffect, useState } from "react";
import { fixDate, getProfiles, getProfileById, createNewProfile } from './ApiClient';
import './App.css';

function ProfileForm () {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  // const [musicGenres, setMusicGenres] = useState([]);

  function saveProfile (e) {
    const data = {
      "fullName": fullName,
      "dob": dob,
      "gender": gender
      //"musicGenres": musicGenres
    }

    createNewProfile(data);
    e.preventDefault();
  };

  return (
    <form onSubmit={saveProfile}>
      <label>FULL NAME</label>
      <input
        type="text"
        value={fullName}
        name="fullName"
        placeholder="Add your name..."
        minLength="2"
        maxLength="30"
        required
        onChange={(e) => setFullName(e.target.value)}
      />
      <br/>

      <label>DATE OF BIRTH</label>
      <input
        type="datetime-local"
        value={dob}
        name="dob"
        required
        onChange={(e) => setDob(fixDate(e.target.value))}
      />
      <br/>

      <label>GENDER</label>
      <br/>
      <label for="man">MAN</label>
      <input
        type="radio"
        value="man"
        id="man"
        name="gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <label for="woman">WOMAN</label>
      <input
        type="radio"
        value="woman"
        id="woman"
        name="gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <br/>

      <button type="submit">SAVE PROFILE</button>
    </form>
  )
}


function Profile ({ profile }) {
  return (
    <>
      <p>{profile.name}</p>
      <p>{profile.dob}</p>
      <p>{profile.gender}</p>
      {/* <p>{profile.musicGenres}</p> */}
    </>
  )
}

function NavBar () {
  return (
    <div className='NavBar'>
      <ul>
        <li>Feed</li>
        <li>Top picks</li>
        <li>Account</li>
      </ul>
    </div>
  )
}

function App() {
  const [potentialMatches, setPotentialMatches] = useState([]);

  function refreshPotentialMatches () {
    getProfiles()
    .then(data => {setPotentialMatches(data)})
  };

  useEffect(() => refreshPotentialMatches(), []);

  return (
    <div className="App">
      <NavBar />
      {
        potentialMatches.map(profile => <Profile profile={profile} key={profile._id} />)
      }
      <ProfileForm />
    </div>
  );
}

export default App;
