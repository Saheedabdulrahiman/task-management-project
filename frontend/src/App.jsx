import { useState } from "react";
import AddTask from "./components/AddTask";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {

  const [selectedState,setSelectedState ]=useState({
    selectedProjectId:undefined,
    project:[]
  })

  function handleCancelAddProject(){
    setSelectedState((prevState)=>{
      return {
        
        ...prevState,
        selectedProjectId:undefined,  

      }
    })
  }

  
  function handleStartAddProject(){
    setSelectedState((prevState)=>{
      return {
        //we are adding a project
        ...prevState,
        selectedProjectId:null,  

      }
    })
  }

  function handleAddProject(projectData){
    setSelectedState(prevState=>{
      const newProject = {
        ...projectData,
        id:Math.random()
      };

      return{
        ...prevState,
        selectedProjectId:undefined,
        project:[...prevState.project,newProject]

      }
    })
  }

  console.log(selectedState)

  let content;
  if(selectedState.selectedProjectId===null){
    content = <NewProject onAdd={handleAddProject}
    onCancel ={handleCancelAddProject}/>
  }
  else if(selectedState.selectedProjectId===undefined){
    content = <NoProjectSelected onSelectProject={handleStartAddProject}/>
  }

  return (
    <>
    <main className=" h-screen my-8 flex gap-8">
     <ProjectsSidebar onSelectProject={handleStartAddProject}
     project={selectedState.project}/> 
    {content}
     </main>

    </>
  );
}

export default App;
