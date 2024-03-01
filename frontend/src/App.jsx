import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Signup = lazy(() => import('./components/Signup.jsx'))
const Signin = lazy(() => import('./components/Signin.jsx'))
const Dashboard = lazy(() => import('./components/Dashboard.jsx'))
const SendMoney = lazy(() => import('./components/SendMoney.jsx'))

function App() {


  return (
    <Suspense>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<SendMoney />} />
      </Routes>
    </Suspense>
  )
}

export default App
