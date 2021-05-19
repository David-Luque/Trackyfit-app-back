const mongoose = require('mongoose');

mongoose
.connect(`mongodb+srv://david_lq_lb:${process.env.DB_PASS}@cluster0.algat.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log(`Connected to ${process.env.DB_NAME} !`);
})
.catch((err) => {
  console.log('error connecting to Mongo: ', err);
});