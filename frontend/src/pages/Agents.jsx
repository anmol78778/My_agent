import { Button } from '@/components/ui/button'
import { getAllAgents } from '@/features/agent'
import { ArrowLeft, Bot, Plus, Workflow } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'


const darkPanel =
  "border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

const whiteBtn =
  "rounded-xl border-0 bg-white text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900";


function Agents() {
  const [agents, setAgents] = useState([])
  const [search,setSearch]=useState("")
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

  const filteredAgent=agents.filter((agent)=>{
    const query=search.toLowerCase()

    return (
      agent?.name?.toLowerCase()?.includes(query) ||
      agent?.instructions?.toLowerCase()?.includes(query) ||
      agent?.knowledgeBase?.toLowerCase()?.includes(query) 
    )
  })

  
  return (
    <div className='relative min-h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#2b2f3a_0%,#191b21_55%,#121317_100%)] text-white'>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />

      <div className='relative z-10'>
        <header
          className='z-30 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6'
        >
          <Link to={"/"} className='flex items-center gap-2.5'>
            <span className='grid size-8 place-items-center rounded-lg bg-white text-zinc-900'><Workflow size={17} /></span>
            <span className='text-sm font-medium tracking-tight'>Automate AI</span>
          </Link>

          <Link to='/' className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs  text-zinc-300 transition hover:bg-white/10 hover:text-white'>
            <ArrowLeft size={14} />
            <span>Back to chat</span>
          </Link>
        </header>

        <main className='mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14'>
          <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
            <div>

              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-300/80">
                <Bot size={15} />
                Agent workspace
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                My Agents
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Manage your AI agents and choose one to get started.
              </p>

            </div>

            <Button
              asChild
              className={`h-10 items-center gap-2 ${whiteBtn}`}
            >
              <Link to="/agents/new" className="inline-flex items-center gap-2">
                <Plus size={17} className="shrink-0" />
                <span>Create agent</span>
              </Link>

            </Button>
          </div>

          <div>

          </div>
        </main>

      </div>
    </div>
  )
}

export default Agents
