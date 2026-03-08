'use client'
import { useCallback, useState } from 'react' 
import { ReactFlow, Handle, Position, useNodesState, useEdgesState , addEdge, Connection } from '@xyflow/react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import '@xyflow/react/dist/style.css'



const initialNodes = [
  { id: '1', type:'agentCard',position: { x: 100, y: 100 }, data: { label: 'Input' } },
  { id: '2', type:'agentCard',position: { x: 400, y: 100 }, data: { label: 'LLM Agent' } },
  { id: '3', type:'agentCard',position: { x: 700, y: 100 }, data: { label: 'Output' } },
]

const initialEdges = [
  {id:'e1-2', source:'1',target:'2'},
  // {id:'e1-2', source:'1',target:'2'},
  {id:'e2-3', source:'2',target:'3'}
]




function AgentCard({ data }: { data:{label: string}}) {
  const[status, setStatus] = useState('Idle')
  

  return (
   
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
       <Handle type="target" position={Position.Left} />
      <h2 className="text-white font-semibold">{data.label}</h2>
      <p className={`text-sm px-2 py-1 rounded-full inline-block ${
      status === 'Running' ? 'bg-green-500 text-white-700' : 'bg-gray-300 text-gray-700'}`}> {status}</p>
      <button onClick = {() => setStatus(status === 'Idle' ? 'Running':'Idle')}
      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
      >Toggle</button>
      <Handle type="source" position={Position.Right} />
    </div>

  )
}

const nodeTypes = {
  agentCard: AgentCard
}


export default function Home() {
 const [edges,setEdges,onEdgesChange] = useEdgesState(initialEdges)
 const [nodes,setNodes,onNodesChange] = useNodesState(initialNodes)
 const onDragOver = (e: React.DragEvent) => e.preventDefault()
 const onConnect = useCallback((connection: Connection) => {
  setEdges((prev) => addEdge(connection, prev))
 }, [setEdges])

 const onDrop = useCallback((e: React.DragEvent) => {
  e.preventDefault()
  const name = e.dataTransfer.getData('componentName')
  const newNode = {
    id: String(Date.now()),
    type: 'agentCard',
    position: { x: e.clientX - 250, y: e.clientY - 50 },
    data: { label: name }
  }
  setNodes((prev) => [...prev, newNode])
}, [setNodes])

  return (

   <SidebarProvider>
    <div className="flex h-screen w-screen">
      <AppSidebar />
      <div style={{ flex: 1, height: '100vh' }}>
        <ReactFlow nodes={nodes} 
        edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} 
        onDragOver = {onDragOver} onDrop = {onDrop} onConnect={onConnect} />
      </div>
    </div>
  </SidebarProvider>
  )
}

