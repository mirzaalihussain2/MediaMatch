const mongoose = require('mongoose');
const url = 'mongodb+srv://ali:hello@cluster0.sq7xmrt.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB with Mongoose
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongoose connected'))
  .catch((error) => console.log('Mongoose NOT connected: ' + error));

// Defining schemas
// Define required fields by which fields are necessary for record creation in the DB
// non-required fields are not required for record creation in the DB.
const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  dob: {
    type: Date,
    required: true,
    min: () => Date.now() - 150*365*24*60*60*1000,
    max: () => Date.now() - 18*365*24*60*60*1000
  },
  gender: {
    type: String,
    required: true
  },
  musicGenres: {
    type: [String]
    // validate: v => Array.isArray(v) && v.length > 0
  },
  photo: {
    type: String,
    required: false,
    get: v => `${root}${v}`,
  },
  liked: {
    type: [mongoose.ObjectId],
    required: false
  },
  rejected: {
    type: [mongoose.ObjectId],
    required: false
  },
  matched: {
    type: [mongoose.Objectid],
    required: false
  }
})

// const ChatSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     required: true
//   }
// })

// Compile model
const profileCollection = mongoose.model('Profile', ProfileSchema); // Collection named 'Profiles';
//const chatCollection = mongoose.model('Chat', ChatSchema); // Collection named 'Chats';

module.exports = {
  profileCollection,
  // chatCollection
};
