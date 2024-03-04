import Button from "./Button";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "./Modal";
import { MdDeleteOutline } from "react-icons/md";


export default function ProjectsSidebar({ onSelectProject, tasks,fetchDataProp }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  // const [isUpdate,setIsUpdate] = useState(false)

  const [projects, setProjects] = useState([]);
  const modalRef = useRef();



  const handleProjectClick = async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/list-projects/${projectId}`
      );
      setSelectedProject(response.data);
      modalRef.current.open();
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

 


  const handleEdit = () => {
    setEditMode(true);
    setEditedTitle(selectedProject.title);
    setEditedDescription(selectedProject.description);
  };

  const handleUpdate = async () => {
    try {
      const updatedProject = { title: editedTitle, description: editedDescription };
      await axios.patch(`http://localhost:3000/api/update-project/${selectedProject._id}`, updatedProject);
      // Refresh the project list to reflect the changes
     
     
      // Exit edit mode after updating
      setEditMode(false);
      modalRef.current.close()
     
      
       
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-project/${projectId}`);
      // Remove the deleted project from the state
      setProjects(projects.filter(project => project.id !== projectId));
      {fetchDataProp}
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };


  let editButton ="capitalize absolute bottom-4 right-24  hover:border-2  font-normal hover:font-semibold py-1 hover:border-stone-800 px-3 rounded-lg  flex"
  return (
    <>
      {selectedProject && (
        <Modal ref={modalRef} >
           {editMode ? (
            <div className="  flex flex-col space-y-4">
              <input
              className=" border-2 border-stone-500 rounded-md py-1 px-2"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
              className=" border-2 border-stone-500 rounded-md py-1 px-2"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              ></textarea>
              
              
            </div>
          ) : (
            <div className="   p-4 relative">
            <h2 className=" font-semibold capitalize text-lg">{selectedProject.title}</h2>
            <p className=" font-thin my-2">{selectedProject.description}</p>
            <p>Due-date: {selectedProject.date}</p>
            
          </div> 
          )}
       {editMode? <button className={editButton} onClick={handleUpdate}>Update</button>:<button  onClick={handleEdit} className={editButton}>edit</button> }
       
        </Modal>
      )}

      <aside className=" w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className=" mb-8 font-bold uppercase md:text-xl text-stone-200">
          your project
        </h2>
        <div>
          <Button onClick={onSelectProject}>add project</Button>
        </div>
        <ul className=" mt-8 space-y-2">
          {tasks.map((task) => (
            <li className=" w-3/4 " key={task._id}>
              <button
                onClick={() => handleProjectClick(task._id)}
                className="  w-full capitalize text-left px-2 py-1 rounded-sm text-stone-400 hover:text-stone-200 hover:bg-stone-800 flex justify-between items-center"
              >
                {task.title}
               <span onClick={() => handleDeleteProject(task._id)} className=" hover:bg-stone-500 w-8 h-8 flex justify-center items-center"><MdDeleteOutline /></span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
