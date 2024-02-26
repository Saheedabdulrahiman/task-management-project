import Button from "./Button";

export default function ProjectsSidebar ({onSelectProject,project}){
    return(
        <>
          <aside className=" w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className=" mb-8 font-bold uppercase md:text-xl text-stone-200">your project</h2>
            <div>
              <Button onClick={onSelectProject}>add project</Button>
              </div>
            <ul className=" mt-8">
              {project.map((project)=><li key={project.id}><button className=" w-full text-left px2 py-1 rounded-sm text-stone-400 hover:text-stone-200 hover:bg-stone-800">{project.title}</button></li>)}</ul>
          </aside>
        </>
    )
}