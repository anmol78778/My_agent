import { getAllAgents } from '@/features/agent'
import React, { useEffect, useState } from 'react'

function Agents() {
  const [agents, setAgents] = useState([])
  const fetchAgents = async () => {
    try {
      const data = await getAllAgents()
      setAgents(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAgents()
  }, [])
  return (
    <div>

    </div>
  )
}

export default Agents
