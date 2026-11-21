import React, { useEffect } from 'react'
import { BrowserRouter, Routes ,Route, Navigate} from 'react-router'
import Login from './pages/Login'
import { me } from './features/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import Home from './pages/Home'
import Agents from './pages/Agents'
import Integration from './pages/Integration'
import CreateAgent from './pages/CreateAgent'
import { setAgents, setAgentsLoading } from './redux/agentSlice'
import { getAllAgents } from './features/agent'
// import { chat } from './features/chat'


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetch = async ()=>{
           try {
            const data = await me()
            // checking ai responses
            // const ai=await chat("whats my name")
            // console.log(ai)
            // console.log(data)
            dispatch(setUserData(data))
           } catch (error) {
            
           }
    }
    fetch()
  },[])

   const fetchAgents = async () => {
      dispatch(setAgentsLoading(true))
      try {
        const data = await getAllAgents()
        dispatch(setAgents(data))
        dispatch(setAgentsLoading(false))
        console.log(data)
      } catch (error) {
        dispatch(setAgentsLoading(false))
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchAgents()
    },[])
  const {userData}=useSelector(state=>state.user)
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={userData?<Navigate to={"/"}/>:<Login/>} />
        <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>} />

        <Route path='/agents' element={userData?<Agents/>:<Navigate to={"/login"}/>} />
        <Route path='/integration' element={userData?<Integration/>:<Navigate to={"/login"}/>} />
        <Route path='/agents/new' element={userData?<CreateAgent/>:<Navigate to={"/login"}/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
