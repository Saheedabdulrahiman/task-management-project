import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAdd,onCancel}) {

  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave(){
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

   //validation

   if(enteredTitle.trim()==="" || 
      enteredDescription.trim()===""||
      enteredDueDate.trim()===""){
        //show the error modal
        modal.current.open();
        return;

      }


    onAdd({
      title:enteredTitle,
      description:enteredDescription,
      dueDate:enteredDueDate
    })
  }



  return (
    <>
      <Modal ref={modal}>
        <h2 className=" text-xl font-bold text-stone-700 my-4">invalid input</h2>
        <p className=" text-stone-600 mb-4">please make sure you provide a valid value for every input</p>
      </Modal>
      <div className=" w-[35rem] mt-16">
        <menu className=" flex items-center justify-end gap-4 my-4">
        
          <li>  <button onClick={onCancel} className=" text-stone-700 hover:text-stone-950 ">cancel</button></li>
          <li>  <button onClick={handleSave} className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">save</button></li>
        
        </menu>
        <div>
         <Input type ="text" ref ={title}label="title"/>
         <Input ref={description} label="description" isTextArea={true}/>
         <Input type = "date" ref={dueDate}  label="due date"/>
        </div>
      </div>
    </>
  );
}
