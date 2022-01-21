import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import PetAddScreen from './screens/PetAddScreen'
import PetDetailsScreen from './screens/PetDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DailyVaccineScreen from './screens/DailyVaccineScreen'
import AppointmentScreen from './screens/AppointmentScreen'
import AppointmentsForm from './components/Appointment/AppointmentsForm'
import InvoiceCustomerScreen from './screens/InvoiceCustomerScreen'
import Sidebar from './components/SideBar/SideBar'
import './components/SideBar/SideBar.css'
import InvoicePetScreen from './screens/InvoicePetScreen'
import InvoicePaymentScreen from './screens/InvoicePaymentScreen'
import InvoiceSummaryScreen from './screens/InvoiceSummaryScreen'

function App() {
  const handleClick = () => {
    document.querySelector('body').classList.toggle('active')
  }
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  useEffect(() => {
    if (width < 800) {
      document.querySelector('body').classList.add('active')
    } else {
      document.querySelector('body').classList.remove('active')
    }
  }, [width])

  return (
    <Router>
      <main className="py-3">
        <div className="wrapper">
          <div className="section">
            {width > 600 && (
              <div className="hamburger" onClick={handleClick}>
                <i className="fas fa-bars"></i>
              </div>
            )}

            <div className="container fluid">
              <Routes>
                <Route path="/" element={<HomeScreen />} exact></Route>
                <Route path="add/:id" element={<PetAddScreen />} exact></Route>

                <Route
                  path="/PetDetails/:id"
                  element={<PetDetailsScreen />}
                  exact
                ></Route>
                <Route path="/add" element={<PetAddScreen />} exact></Route>
                <Route
                  path="/register"
                  element={<RegisterScreen />}
                  exact
                ></Route>
                <Route path="/login" element={<LoginScreen />} exact></Route>

                <Route
                  path="/Appointments"
                  element={<AppointmentScreen />}
                  exact
                ></Route>

                <Route
                  path="/appointmentForm"
                  element={<AppointmentsForm />}
                  exact
                ></Route>
                <Route
                  path="/appointmentForm/:id"
                  element={<AppointmentsForm />}
                  exact
                ></Route>

                <Route
                  path="/DailyVaccines/:id"
                  element={<DailyVaccineScreen />}
                  exact
                ></Route>

                <Route
                  path="/CheckoutCustomer"
                  element={<InvoiceCustomerScreen />}
                  exact
                ></Route>
                <Route
                  path="/Checkout/:id"
                  element={<InvoicePetScreen />}
                  exact
                ></Route>
                <Route
                  path="/Checkout"
                  element={<InvoicePetScreen />}
                  exact
                ></Route>
                <Route
                  path="/Payment"
                  element={<InvoicePaymentScreen />}
                  exact
                ></Route>
                <Route
                  path="/Summary"
                  element={<InvoiceSummaryScreen />}
                  exact
                ></Route>
              </Routes>
            </div>
          </div>
          <Sidebar />
        </div>
      </main>

      <Footer />
    </Router>
  )
}

export default App
