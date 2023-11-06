import React, { useEffect,useState } from 'react'
import axios from "axios";
import { Grid, Paper, Typography, TextField, Button } from '@mui/material'
import { useParams } from 'react-router-dom';

const EditCustomer = (props) => {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }

    const [customer, showCustomer] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/customer/${id}`).then((customer) => {
            showCustomer(customer.data);

        })
    })

    const updateCustomer = () => {
        axios.patch((`http://localhost:5000/customer/${id}`), customer).then((customer) => {
            showCustomer(customer.data)
            window.alert('Successfully Edited')
        })
    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Update Customer Details</h2>
                    <Typography variant='caption' gutterBottom>Edit the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" value={customer.name} onChange={(e) => showCustomer({ ...customer, name: e.target.value })} fullWidth label='Name' placeholder="Enter your name" />
                    <TextField style={marginTop} id="email" value={customer.email} onChange={(e) => showCustomer({ ...customer, email: e.target.value })} fullWidth label='Email' placeholder="Enter your email" />
                    <TextField style={marginTop} id="phoneNumber" value={customer.phoneNumber} onChange={(e) => showCustomer({ ...customer, phoneNumber: e.target.value })} fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <TextField style={marginTop} id="location" value={customer.location} onChange={(e) => showCustomer({ ...customer, location: e.target.value })} fullWidth label='Location' />
                    <TextField style={marginTop} id="subscribedToPackage" value={customer.subscribedToPackage} onChange={(e) => showCustomer({ ...customer, subscribedToPackage: e.target.value })} fullWidth label='Subscribed Package' />
                    <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={updateCustomer}>Update</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default EditCustomer;