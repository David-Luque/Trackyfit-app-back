const mongoose = require('mongoose');

mongoose
.connect(`${process.env.MONGODB_URI}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log(`Connected to ${process.env.MONGODB_URI}`);
})
.catch((err) => {
  console.log('error connecting to Mongo: ', err);
});