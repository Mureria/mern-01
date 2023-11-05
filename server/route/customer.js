const express = require('express');
const router = express.Router();

const { createCustomer, allCustomers, singleCustomer, updateCustomer, deleteCustomer } = require('../controllers/customer');


// Create customer
router.post('/',  createCustomer );


// Get all users
router.get('/all', allCustomers);


// Get single customer by id
router.get('/:id', singleCustomer);


// Update customer
router.put('/:id', updateCustomer);


// Delete customer 
router.delete('/:id', deleteCustomer);
  


module.exports = router;