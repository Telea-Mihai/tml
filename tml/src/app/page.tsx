"use client";

import { useState, useEffect } from "react";

import Screen from "./components/Screen";
import Floppy from "./components/Floppy";
import { Summary, generateSummary } from "@/lib/summary";
import { Category, getAllCategories } from "@/lib/categoryInter";
import "./home.css";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [summary, setSummary] = useState<Summary|null>(null);
  const [selectedCatId, setSelectedCatId] = useState<number|null>(null);

  async function loadPage(){
    const cats = await getAllCategories();
    if(cats)
      setCategories(cats);
  }

  async function onClickFloppy(id: number) {
    const sum = await generateSummary(id);
    setSelectedCatId(id);
    setSummary(sum);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <main className="homeLayout ">
      <div className="overflow-y-scroll" style={{direction:"rtl"}}>
      <div className="Menu">
          <div className="Category">
            <div className="Deck">
              {categories.map((cat)=>(
                <Floppy key={cat.name} text={cat.name} color={cat.color} catId={cat.id} loaded={selectedCatId === cat.id} onClick={onClickFloppy}/>
              ))}
            </div>

            <div className="boxWall" aria-hidden="true">
              <h1 className="selected">Projects</h1>
            </div>
          </div>
          <div className="Category">

            <div className="Deck">
              <Floppy text="Who am I?"/>
              <Floppy text="Experience"/>
              <Floppy text="Education"/>
              <Floppy text="Achievements"/>
              <Floppy text="Contact"/>
            </div>
            <div className="boxWall" aria-hidden="true" >
              <h1>About me</h1>
            </div>
          </div>
      </div>
      </div>
      <div className="Machine noise">
        <div className="Upper ">
          <img src="/Logo.svg" alt="TML Logo" className="Logo" />
          <h2>Making cool stuff that also works. <br></br> (sometimes)</h2>
        </div>
        <div className="Lower">
          <div className="Screen">
            <Screen sum={summary}/>
          </div>
        </div>
      </div>
      
    </main>
  );
}