const Customer = require('../model/customer');


// Create customer
const createCustomer = async(req, res) => {

    try {

        // Get customer input
        const { name, email, phoneNumber, location, subscribedToPackage} = req.body;
    
        // Check if user already exists in our database
        const existingUser = await Customer.findOne({ email });

        if (existingUser) {
          return res.status(409).send('User Already Exist!');
        }

        // If doesn't exist, Create user in the database
        const customer = await Customer.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            phoneNumber,
            location,
            subscribedToPackage,
            subscribeDate:Date.now()
        });

        // Save user in the db
        const newCustomer = await customer.save()

        // Return user
        res.status(201).json(newCustomer);
        
    } catch (err) {
       res.status(400).json({message: err.message}) 
    }    
};


// Get all users
const allCustomers =  async(req, res) => {
    try {
        // Get all customers in the db
        const allCustomers = await Customer.find();
        
        // Return all the customers
        res.status(200).json(allCustomers);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};



// Get single customer by id
const singleCustomer =  async(req, res) => {
    try {
        
        //Check customer by id in the database 
        const customer = await Customer.findById(req.params.id);

        if(!customer) {
            return res.status(404).json('User not found!');
        };

          // Return the customer
          return res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Update customer
const updateCustomer = async (req, res) => {
    try {
      const userId = req.params.id;  //Get customer id by params
      const updateData = req.body; // Update data from the request body
  
      // Use findByIdAndUpdate to find and update the user
      const user = await Customer.findByIdAndUpdate(userId, updateData, { new: true });
  
      if (!user) {
        return res.status(404).json('User not found!');
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


// Delete customer
const deleteCustomer = async (req, res) => {
    try {

      // Get the customer by id in our database
      const customer = await Customer.findById(req.params.id);
        
      //Validate   
      if (!customer) {
        return res.status(404).json('User not found!');
      }

      await Customer.findByIdAndDelete(customer);
      
      res.json('User deleted successfully!');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };




module.exports = {createCustomer, allCustomers, singleCustomer, updateCustomer, deleteCustomer};