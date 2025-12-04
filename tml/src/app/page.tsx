"use client";

import { useState, useEffect, useRef } from "react";

import Screen from "../components/Screen";
import Floppy from "../components/Floppy";
import DiskReader from "../components/DiskReader";
import { Summary, generateSummary } from "@/lib/summary";
import { Category, getAllCategories } from "@/lib/categoryInter";
import "./home.css";
import ContactContent from "@/components/ContactContent";
import { PanInfo } from "framer-motion";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [selectedSpecial, setSelectedSpecial] = useState<string | null>(null);
  const [screenContent, setScreenContent] = useState<React.ReactNode | null>(null);
  const [insertedDiskId, setInsertedDiskId] = useState<number | null>(null);
  const [insertingDiskId, setInsertingDiskId] = useState<number | null>(null);
  const [insertedSpecialId, setInsertedSpecialId] = useState<string | null>(null);
  const [insertingSpecialId, setInsertingSpecialId] = useState<string | null>(null);
  const [isEjecting, setIsEjecting] = useState(false);
  const [projectsDrawerOpen, setProjectsDrawerOpen] = useState(false);
  const [aboutDrawerOpen, setAboutDrawerOpen] = useState(false);
  const diskReaderRef = useRef<HTMLDivElement>(null);

  async function loadPage() {
    const cats = await getAllCategories();
    if (cats)
      setCategories(cats);
  }



  function generateSpecialSummary(specialId: string): any {
    const summaries: any = {
      whoami: {
        title: "Who am I",
        specialId: "whoami",
        description: "Personal information and biography",
        sections: ["Name & Role", "Biography", "Location", "Contact"],
        imageUrl: null,
        color: "#2d4a7c"
      },
      experience: {
        title: "Experience",
        specialId: "experience",
        description: "Professional work experience",
        sections: ["Current Position", "Previous Roles", "Technologies Used"],
        imageUrl: null,
        color: "#4a7c2d"
      },
      education: {
        title: "Education",
        specialId: "education",
        description: "Academic background and achievements",
        sections: ["Degrees", "Institutions", "Key Achievements"],
        imageUrl: null,
        color: "#7c2d4a"
      },
      achievements: {
        title: "Achievements",
        specialId: "achievements",
        description: "Notable accomplishments and milestones",
        sections: ["Awards", "Certifications", "Recognition"],
        imageUrl: null,
        color: "#7c5a2d"
      },
      contact: {
        title: "Contact",
        specialId: "contact",
        description: "Get in touch with me",
        sections: ["Email", "LinkedIn", "GitHub", "Social Media"],
        imageUrl: null,
        color: "#1f2c44"
      }
    };
    return summaries[specialId] || null;
  }

  async function specialFloppy(c: string) {
    setSelectedCatId(null);
    setSummary(null);
    setSelectedSpecial(c);
    
    const specialSummary = generateSpecialSummary(c);
    setSummary(specialSummary as any);
    setScreenContent(null);
  }

  async function handleSpecialDragEnd(specialId: string | undefined, info: PanInfo, element: HTMLElement) {
    if (specialId === undefined || insertedDiskId !== null || insertedSpecialId !== null) return;

    const dropZone = document.querySelector('[data-drop-zone="true"]');
    const deck = element.closest('.Deck');

    if (!dropZone || !deck) return;

    const dropZoneRect = dropZone.getBoundingClientRect();
    const deckRect = deck.getBoundingClientRect();
    const dragPoint = {
      x: info.point.x,
      y: info.point.y
    };

    const isInDropZone =
      dragPoint.x >= dropZoneRect.left &&
      dragPoint.x <= dropZoneRect.right &&
      dragPoint.y >= dropZoneRect.top &&
      dragPoint.y <= dropZoneRect.bottom;

    if (isInDropZone) {
      const floppyRect = element.getBoundingClientRect();
      const deltaX = dropZoneRect.left + dropZoneRect.width / 2 - (floppyRect.left + floppyRect.width / 2);
      const deltaY = dropZoneRect.top + dropZoneRect.height / 2 - (floppyRect.top + floppyRect.height / 2);

      (window as any).__floppyInsertTarget = { x: deltaX + info.offset.x, y: deltaY + info.offset.y };

      setInsertingSpecialId(specialId);
      setSelectedSpecial(specialId);
      setScreenContent(null);
      setSelectedCatId(null);

      setTimeout(() => {
        setInsertedSpecialId(specialId);
        setInsertingSpecialId(null);
        setAboutDrawerOpen(false);
        setProjectsDrawerOpen(false);
        delete (window as any).__floppyInsertTarget;
      }, 600);

      await specialFloppy(specialId);
    }
  }

  async function handleDragEnd(catId: number | undefined, info: PanInfo, element: HTMLElement) {
    if (catId === undefined || insertedDiskId !== null || insertedSpecialId !== null) return;

    const dropZone = document.querySelector('[data-drop-zone="true"]');
    const deck = element.closest('.Deck');

    if (!dropZone || !deck) return;

    const dropZoneRect = dropZone.getBoundingClientRect();
    const deckRect = deck.getBoundingClientRect();
    const dragPoint = {
      x: info.point.x,
      y: info.point.y
    };

    const isInDropZone =
      dragPoint.x >= dropZoneRect.left &&
      dragPoint.x <= dropZoneRect.right &&
      dragPoint.y >= dropZoneRect.top &&
      dragPoint.y <= dropZoneRect.bottom;

    const isInDeck =
      dragPoint.x >= deckRect.left &&
      dragPoint.x <= deckRect.right &&
      dragPoint.y >= deckRect.top &&
      dragPoint.y <= deckRect.bottom;

    if (isInDropZone) {

      const floppyRect = element.getBoundingClientRect();
      const deltaX = dropZoneRect.left + dropZoneRect.width / 2 - (floppyRect.left + floppyRect.width / 2);
      const deltaY = dropZoneRect.top + dropZoneRect.height / 2 - (floppyRect.top + floppyRect.height / 2);

      (window as any).__floppyInsertTarget = { x: deltaX + info.offset.x, y: deltaY + info.offset.y };

      setInsertingDiskId(catId);
      setSelectedCatId(catId);
      setScreenContent(null);
      setSelectedSpecial(null);

      setTimeout(() => {
        setInsertedDiskId(catId);
        setInsertingDiskId(null);
        setAboutDrawerOpen(false);
        setProjectsDrawerOpen(false);
        delete (window as any).__floppyInsertTarget;
      }, 600);



      const sum = await generateSummary(catId);
      setSummary(sum);
      console.log(sum);
    } 
  }

  function handleEject() {
    if (insertedDiskId === null && insertedSpecialId === null) return;

    setIsEjecting(true);
    setInsertedDiskId(null);
    setInsertedSpecialId(null);
    setSelectedCatId(null);
    setSelectedSpecial(null);
    setSummary(null);
    setScreenContent(null);

    // Reset ejecting state after animation completes
    setTimeout(() => {
      setIsEjecting(false);
    }, 600);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <main className="homeLayout ">
      <div className="MenuHolder">
        <div className="Menu">
          <div className={`Category drawer ${projectsDrawerOpen ? 'open' : ''}`}>
            <button
              className="drawerHandle"
              onClick={() => setProjectsDrawerOpen(!projectsDrawerOpen)}
              aria-label={projectsDrawerOpen ? "Close Projects drawer" : "Open Projects drawer"}
            >
              <div className="handleGrip"></div>
            </button>
            <div className="Deck">
              {categories.map((cat) => {
                // Don't render the floppy in the deck if it's inserted in the reader
                if (insertedDiskId === cat.id && !isEjecting) return null;

                return (
                  <Floppy
                    key={cat.name}
                    text={cat.name}
                    color={cat.color}
                    catId={cat.id}
                    loaded={selectedCatId === cat.id && !selectedSpecial && insertedDiskId === null && insertingDiskId === null}
                    onClick={undefined}
                    isDraggable={insertedDiskId === null && insertingDiskId === null}
                    onDragEnd={handleDragEnd}
                    isInserting={insertingDiskId === cat.id}
                    isEjecting={isEjecting && insertedDiskId === null && selectedCatId === cat.id}
                  />
                );
              })}
            </div>

            <div className="boxWall" aria-hidden="true">
              <h1 className="selected">Projects</h1>
            </div>
          </div>
          <div className={`Category drawer ${aboutDrawerOpen ? 'open' : ''}`}>
            <button
              className="drawerHandle"
              onClick={() => setAboutDrawerOpen(!aboutDrawerOpen)}
              aria-label={aboutDrawerOpen ? "Close About Me drawer" : "Open About Me drawer"}
            >
              <div className="handleGrip"></div>
            </button>
            <div className="Deck">
              <Floppy 
                text="?Who am I"
                color="#2d4a7c"
                isDraggable={insertedDiskId === null && insertingDiskId === null && insertedSpecialId === null && insertingSpecialId === null}
                onDragEnd={(_, info, element) => handleSpecialDragEnd("whoami", info, element)}
                isInserting={insertingSpecialId === "whoami"}
                isEjecting={isEjecting && insertedSpecialId === null && selectedSpecial === "whoami"}
                loaded={selectedSpecial === "whoami" && !selectedCatId && insertedSpecialId === null && insertingSpecialId === null}
              />
              <Floppy 
                text="Experience"
                color="#4a7c2d"
                isDraggable={insertedDiskId === null && insertingDiskId === null && insertedSpecialId === null && insertingSpecialId === null}
                onDragEnd={(_, info, element) => handleSpecialDragEnd("experience", info, element)}
                isInserting={insertingSpecialId === "experience"}
                isEjecting={isEjecting && insertedSpecialId === null && selectedSpecial === "experience"}
                loaded={selectedSpecial === "experience" && !selectedCatId && insertedSpecialId === null && insertingSpecialId === null}
              />
              <Floppy 
                text="Education"
                color="#7c2d4a"
                isDraggable={insertedDiskId === null && insertingDiskId === null && insertedSpecialId === null && insertingSpecialId === null}
                onDragEnd={(_, info, element) => handleSpecialDragEnd("education", info, element)}
                isInserting={insertingSpecialId === "education"}
                isEjecting={isEjecting && insertedSpecialId === null && selectedSpecial === "education"}
                loaded={selectedSpecial === "education" && !selectedCatId && insertedSpecialId === null && insertingSpecialId === null}
              />
              <Floppy 
                text="Achievements"
                color="#7c5a2d"
                isDraggable={insertedDiskId === null && insertingDiskId === null && insertedSpecialId === null && insertingSpecialId === null}
                onDragEnd={(_, info, element) => handleSpecialDragEnd("achievements", info, element)}
                isInserting={insertingSpecialId === "achievements"}
                isEjecting={isEjecting && insertedSpecialId === null && selectedSpecial === "achievements"}
                loaded={selectedSpecial === "achievements" && !selectedCatId && insertedSpecialId === null && insertingSpecialId === null}
              />
              <Floppy 
                text="Contact" 
                color="#1f2c44" 
                isDraggable={insertedDiskId === null && insertingDiskId === null && insertedSpecialId === null && insertingSpecialId === null}
                onDragEnd={(_, info, element) => handleSpecialDragEnd("contact", info, element)}
                isInserting={insertingSpecialId === "contact"}
                isEjecting={isEjecting && insertedSpecialId === null && selectedSpecial === "contact"}
                loaded={selectedSpecial === "contact" && !selectedCatId && insertedSpecialId === null && insertingSpecialId === null}
              />
            </div>
            <div className="boxWall" aria-hidden="true" >
              <h1>About me</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="Machine noise">
        <div className="Upper ">
          <div ref={diskReaderRef}>
            <DiskReader
              hasInsertedDisk={insertedDiskId !== null || insertedSpecialId !== null}
              onEject={handleEject}
              insertedDiskColor={
                insertedDiskId !== null 
                  ? categories.find(cat => cat.id === insertedDiskId)?.color 
                  : insertedSpecialId !== null 
                    ? "#1f2c44" 
                    : null
              }
            />
          </div>
          <div className="LogoSection">
            <img src="/Logo.svg" alt="TML Logo" className="Logo" />
            <h2>Making cool stuff that also works. <br></br> (sometimes)</h2>
          </div>
        </div>
        <div className="Lower">
          <div className="Screen">
            <Screen sum={summary}>
              {screenContent ? screenContent : null}
            </Screen>
          </div>
        </div>
      </div>

    </main>
  );
}