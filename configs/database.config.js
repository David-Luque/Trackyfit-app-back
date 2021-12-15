const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env' });

const connectToDB = async ()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log(`Connected to ${process.env.MONGODB_URI}`);
  } catch(err) {
    console.log('error connecting to Mongo: ', err);
  }
  
};

module.exports = connectToDB;
