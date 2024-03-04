import { useState,useEffect } from "react";
import AddTask from "./components/AddTask";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import axios from 'axios';


function App() {

  const [selectedState,setSelectedState ]=useState({
    selectedProjectId:undefined,
    project:[]
  })

  const [tasks, setTasks] = useState([]);

  

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

 
 
 
  useEffect(() => {
    // Fetch tasks from backend when component mounts
   fetchData();
  }, []); 


  const fetchData = () => { 
     axios.get('http://localhost:3000/api/list-projects')
  .then(response => {
    setTasks(response.data); 
  })
  .catch(error => {
    console.error('Error fetching tasks:', error);
  });
}



  
  const handleAddProject = async(event) => { 
    event.preventDefault();
  
   const fd =  new FormData(event.target)
  const data =  Object.fromEntries(fd.entries());
  
     //validation
  
    //  if(title.trim()==="" || 
    //     description.trim()===""||
    //     date.trim()===""){
    //       //show the error modal
    //       modal.current.open();
    //       return;
  
    //     }
    try {
      const response = await axios.post('http://localhost:3000/api/add-project',data);
      console.log("server response",response.data);
     fetchData();
      
    } catch (error) {
      console.error('Error submitting data:', error); // Log any errors
        alert('An error occurred while submitting data. Please try again later.'); 
    }
  
    event.target.reset();
   }
   

   

  console.log(selectedState)

  let content;
  if(selectedState.selectedProjectId===null){
    content = <NewProject handleSubmit={handleAddProject}
    onCancel ={handleCancelAddProject}/>
  }
  else if(selectedState.selectedProjectId===undefined){
    content = <NoProjectSelected onSelectProject={handleStartAddProject}/>
  }

  



  return (
    <>
    <main className=" h-screen my-8 flex gap-8">
     <ProjectsSidebar onSelectProject={handleStartAddProject}
     tasks={tasks}
  /> 
    {content}
     </main>

    </>
  );
}

export default App;
