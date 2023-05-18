const mongoose = require('mongoose');
const { Schema } = mongoose;
// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

const password = process.argv[2];
const url = `mongodb+srv://umesharma78:${password}@cluster0.wznaume.mongodb.net/contact?retryWrites=true&w=majority`;

// const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookSchema = new Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('person', phonebookSchema);
// Contact.find({}).then((result) => {
//   result.forEach((contact) => {
//     console.log(contact);
//   });
//   mongoose.connection.close();
// });

const contact = new Contact({
  name: 'Dan Abramov',
  number: '12-43-234345',
});

contact.save().then((result) => {
  console.log(result);
  console.log('contact saved');
  mongoose.connection.close();
});
// {
//    id: 1,
//    name: 'Arto Hellas',
//    number: '040-123456',
//  },
//  {
//    id: 2,
//    name: 'Ada Lovelace',
//    number: '39-44-5323523',
//  },
//  {
//    id: 3,
//    name: 'Dan Abramov',
//    number: '12-43-234345',
//  },
//  {
//    id: 4,
//    name: 'Mary Poppendieck',
//    number: '39-23-6423122',
//  },
