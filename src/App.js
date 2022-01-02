import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PetAddScreen from './screens/PetAddScreen'
import PetDetailsScreen from './screens/PetDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DailyVaccineScreen from './screens/DailyVaccineScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/:id" element={<PetAddScreen />} exact></Route>

            <Route
              path="/PetDetails/:id"
              element={<PetDetailsScreen />}
              exact
            ></Route>
            <Route path="/add" element={<PetAddScreen />} exact></Route>
            <Route path="/register" element={<RegisterScreen />} exact></Route>
            <Route path="/login" element={<LoginScreen />} exact></Route>

            <Route
              path="/DailyVaccines/:id"
              element={<DailyVaccineScreen />}
              exact
            ></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
