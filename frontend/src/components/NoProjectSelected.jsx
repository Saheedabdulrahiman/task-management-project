import Button from "./Button";
import noProjectImg from "../assets/no-projects.png"
export default function  NoProjectSelected({onSelectProject}){
    return(
        <>
          <div className=" mt-24 text-center w-2/3">
            <img src={noProjectImg} alt="no project image" 
            className=" w-16 h-16 object-contain mx-auto"/>
            <h2 className=" text-xl font-bold text-stone-500 my-4">No projects Selected</h2>
             <p className=" text-stone-400 mb-4">select a project or start with a new one</p>
             <p className="mt-8">
             <Button onClick={onSelectProject}>create new project</Button>
             </p>
          </div>
        </>
    )
}