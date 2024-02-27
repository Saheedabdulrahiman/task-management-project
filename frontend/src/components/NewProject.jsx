import { useRef,useState } from "react";
import Input from "./Input";
import Modal from "./Modal";
import axios from 'axios';

export default function NewProject() {

  const modal = useRef();


 


 const handleSubmit = async(event) => { 
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
    
  } catch (error) {
    console.error('Error submitting data:', error); // Log any errors
      alert('An error occurred while submitting data. Please try again later.'); 
  }

  event.target.reset();
 }




  
 

  return (
    <>
      <Modal ref={modal}>
        <h2 className=" text-xl font-bold text-stone-700 my-4">invalid input</h2>
        <p className=" text-stone-600 mb-4">please make sure you provide a valid value for every input</p>
      </Modal>
      <form onSubmit={handleSubmit} >
      <div className=" w-[35rem] mt-16">
        <menu className=" flex items-center justify-end gap-4 my-4">
        
          <li>  <button  className=" text-stone-700 hover:text-stone-950 ">cancel</button></li>
          <li>  <button type="submit" className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">save</button></li>
        
        </menu>
        <div>
         <Input type ="text" name="title" label="title"/>
         <Input label="description" name="description" isTextArea={true}/>
         <Input type = "date" name="date"  label="due date"/>
        </div>
      </div>
      </form>
    </>
  );
}
