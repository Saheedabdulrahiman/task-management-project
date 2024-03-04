import React from 'react'

export default function ListProjects({projects}) {
  return (
    <>
     {projects.map((project)=><li key={project.id}><div className=" ">{project.title}</div></li>)}
             
    </>
  )
}
