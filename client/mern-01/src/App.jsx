import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateCustomer from './components/createCustomer'
import CustomerList from './components/customerList'
import EditCustomer from './components/editCustomers'


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<CreateCustomer />} />        
        <Route path='/customer/all' element={<CustomerList/>}/>
        <Route path='/edit/:id' element={<EditCustomer/>}/>
      </Routes>
    </BrowserRouter>  
  )
}

 
export default App
