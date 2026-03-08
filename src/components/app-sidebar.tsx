import { Sidebar, SidebarContent } from "@/components/ui/sidebar"


export function AppSidebar() {
  const components = ['Inference', 'Training', 'Fine-tuning','Embeddings','Evaluation','Data Preprocessing','Deployment']

  return (
   <Sidebar> 
     <SidebarContent>
      <h2 className="text-black font-bold mb-4">LLM  Trianing Components</h2>
      {components.map((name) => (
        <div key={name} draggable={true}
        onDragStart={(e) => e.dataTransfer.setData('componentName', name)}
        className="p-3 mb-2 bg-gray-700 rounded text-white text-sm">
          {name}
        </div>
      ))}  
      </SidebarContent>
    </Sidebar>
  )
}
