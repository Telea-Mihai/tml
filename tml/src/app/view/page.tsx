"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Category, getCategoryById } from "@/lib/categoryInter";
import { Project, getProjectById, getProjectsByIds } from "@/lib/projectInter";
import './styles.css'
import Title from "../components/Title";
import Button from "../components/Button";


export default function viewPage() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loadedProject, setLoadedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const dotSequence = [".", "..", "...", ""];
  const [dotIndex, setDotIndex] = useState(0);

  async function loadPage() {
    const id = searchParams.get('id');
    if (id) {
      const cat = await getCategoryById(parseInt(id));
      setCategory(cat);
      if (cat && cat.projects && cat.projects.length > 0) {
        const projs = await getProjectsByIds(cat.projects);
        setProjects(projs);
      }

    }
  }

  async function loadedProjectData(id: number) {
    const proj = await getProjectById(id);
    setLoadedProject(proj);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 3100);
  }

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotSequence.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return <main className="viewLayout textFlicker screenGlare noise">
    <div className="scanLines"/>
    {category ? <div className="sideBar">
      <div className="flex flex-col gap-[0.2rem]">
        <Title content={`>${category.name.toUpperCase()}`} color={category.color!} />
        <h2 className="text-[#ACACAC] mt-[0.3rem]">Please make a selection</h2>
        {projects ? projects.map((proj) => <Button key={proj.id} content={loadedProject?.id === proj.id ? proj.name + ">OPEN" : proj.name} selected={loadedProject?.id === proj.id} color={"white"} onClick={() => { loadedProjectData(proj.id) }} />) : <div>Loading projects...</div>}
      </div>
      <Button content="eject disk" color="RED" onClick={() => { window.location.href = "/" }} />
    </div> : <div className="flex justify-center items-center w-full h-full">Loading data...</div>}
    {
      loadedProject ? (loading ? <div className="flex w-full h-full justify-center items-center">Loading project data{dotSequence[dotIndex]}</div> : <div className="projectDisplay">

        <div className="flex flex-col gap-[0.2rem] ml-[2rem] mb-[1rem]">
          <h1 className="projectTitle boxflicker">Project title: {loadedProject.name + ">"}</h1>
          <div className="flex gap-[1rem]">
            <h2>Link to project: </h2>
            <a className="underline text-blue-500" href={loadedProject.linkDemo ? loadedProject.linkDemo : "#"} target="_blank" rel="noopener noreferrer">{loadedProject.linkDemo ? loadedProject.linkDemo : "No link available"}</a>
          </div>
          <div className="flex gap-[1rem]">
            <h2>Github: </h2>
            <a className="underline text-blue-500" href={loadedProject.linkGit ? loadedProject.linkGit : "#"} target="_blank" rel="noopener noreferrer">{loadedProject.linkGit ? loadedProject.linkGit : "No link available"}</a>
          </div>
        </div>
        <div className="comboGrid">
          <div className="div1">
            <h2 className="underline">Tech stack:</h2>
            <ul >
              {loadedProject.techStack!.map((tech, index) => <li key={index}>- {tech}</li>)}
            </ul>
          </div>
          <div className="div2">
            <h2>Status:</h2>
            <p style={{ color: loadedProject.status.toLowerCase() == "completed" ? "green" : loadedProject.status.toLowerCase() == "in progress" || loadedProject.status.toLowerCase() == "planning" ? "orange" : "red" }}>{loadedProject.status}</p>
          </div>
          <div className="div3">
            <h2 className="underline">Features:</h2>
            <ul>
              {loadedProject.features!.map((feature, index) => <li key={index}>- {feature}</li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] mt-[0.5rem] ml-[1rem]">
          <h2 className="underline">My role in this project:</h2>
          <p>{loadedProject.myRole}</p>
        </div>
        <div className="flex flex-col gap-[0.5rem] mt-[0.5rem] ml-[1rem]">
          <h2 className="underline">Description:</h2>
          <p>{loadedProject.description}</p>
        </div>
        {
          loadedProject.images && loadedProject.images.length > 0 ? <div className="flex flex-col gap-[0.5rem] mt-[0.5rem] ml-[1rem]">
            <h2 className="underline">Images:</h2>
            <div className="flex gap-[1rem] overflow-x-auto pb-[1rem]">
              {loadedProject.images.map((imgUrl, index) => <img key={index} src={imgUrl} alt={`Project image ${index + 1}`} className="projectImage" />)}
            </div>
          </div> : null
        }
      </div>) : <div className="flex justify-center items-center w-full h-full">No project loaded</div>
    }
  </main>;
}