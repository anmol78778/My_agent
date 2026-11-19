import React, { useEffect } from 'react'
import { BrowserRouter, Routes ,Route, Navigate} from 'react-router'
import Login from './pages/Login'
import { me } from './features/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import Home from './pages/Home'


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetch = async ()=>{
           try {
            const data = await me()
            // console.log(data)
            dispatch(setUserData(data))
           } catch (error) {
            
           }
    }
    fetch()
  },[])

  const {userData}=useSelector(state=>state.user)
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={userData?<Navigate to={"/"}/>:<Login/>} />
        <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
