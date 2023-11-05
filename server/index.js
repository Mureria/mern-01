require('dotenv').config()
const cors = require('cors');
const express =require('express');
const app = express()
const mongoose = require('mongoose');
const customerRoute = require('./route/customer');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/customer', customerRoute)


mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
  });

