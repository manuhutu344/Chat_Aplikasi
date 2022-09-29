const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://mern-chat-backend:${process.env.DB_PW}@cluster0.lqotuoo.mongodb.net/mernchat?retryWrites=true&w=majority`, ()=>{
  console.log('Sukses Gaes Anjay Mabar Srepet')
})
