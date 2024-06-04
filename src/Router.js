import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
function Routing() {
  const stripePromise = loadStripe('pk_test_51PLdQyDCj9psrsf04uY9ON4BdCdvyV6qjtKOu10GXDKCtuoIUkabYuBSJPrNmJGCUHY6v2aQgcHSaAFPjNQNuG0v00tj2E0c4c');
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/payments" 
            element={
              <ProtectedRoute 
              msg={"you must log in to pay"}
              redirect={"/payments"}> 
              <Elements stripe={stripePromise} >
                <Payment />
            </Elements>
            </ProtectedRoute>
            }
            />
            <Route path="/orders" element={
            <ProtectedRoute msg={"You must log in to see your orders"} redirect={"/orders"}>
            <Orders />    
            </ProtectedRoute>
        
        } />
        
             
            
            <Route path="/category/:categoryName" element={<Results />} />
            <Route path="/Products/:ProductId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} /> 

        </Routes>

    </Router>
  )
}

export default Routing
