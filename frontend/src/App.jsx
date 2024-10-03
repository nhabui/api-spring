import { useState } from 'react'
import './App.css'
import ListTodoComponent from './components/ListVulnComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TodoComponent from './components/VulnComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({ children }) {

    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:8080 */}
          <Route path='/' element={<LoginComponent />}></Route>
          {/* http://localhost:8080/patchings */}
          <Route path='/vulns' element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }></Route>
          {/* http://localhost:8080/add-patching */}
          <Route path='/add-vuln' element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }></Route>
          {/* http://localhost:8080/update-patching/1 */}
          <Route path='/update-vuln/:id' element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }></Route>
          {/* http://localhost:8080/register */}
          <Route path='/register' element={<RegisterComponent />}></Route>

          {/* http://localhost:8080/login */}
          <Route path='/login' element={<LoginComponent />}></Route>

        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
