"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import '../view/styles.css';
import Title from "../../components/Title";
import Button from "../../components/Button";

const specialFloppyData: any = {
  whoami: {
    title: "Who am I",
    color: "#2d4a7c",
    content: {
      name: "Telea Mihai Laurențiu",
      role: "Student & Aspiring Developer",
      bio: "A passionate student eager to learn and grow in the field of software and game development plus robotics. Always looking for new challenges and opportunities to expand my skills. \n My hobbies include coding, gaming, building robots and playing the piano.",
      location: "Brasov, Romania",
      email: "mihaitelea02@gmail.com"
    }
  },
  experience: {
    title: "Experience",
    color: "#4a7c2d",
    content: [
      {
        company: "HackClub Neighborhood - San Francisco, CA",
        position: "Atendee",
        period: "2025",
        description: "I was selected to attend HackClub's Neighborhood program in San Francisco, where I collaborated with fellow young developers on innovative projects and honed my coding skills for the span of a month.",
        technologies: []
      },
      {
        company: "Daydream Workshops",
        position: "Organizer - Volunteer & Teacher",
        period: "2025",
        description: "Organized and taught workshops focused on game development using C# and Unity and creating game assets like 3D models and sounds.",
        technologies: ["C#", "Unity", "Blender", "Audacity"]
      },
      {
        company: "Daydream Hackathon",
        position: "Organizer - Volunteer & Judge",
        period: "2025",
        description: "Description of your role and achievements.",
        technologies: []
      }
    ]
  },
  education: {
    title: "Education",
    color: "#7c2d4a",
    content: [
      {
        institution: "National College of Informatics 'Grigore Moisil' Brasov",
        degree: "To be Graduated",
        field: "Mathematics and Informatics - intensive computer science",
        period: "2023-",
        achievements: [""]
      }
    ]
  },
  achievements: {
    title: "Achievements",
    color: "#7c5a2d",
    content: [
      {
        title: "Infotron - 1st Place",
        date: "2023",
        description: "Won first place in the Infotron robotics competition with a project named Voxie, an alexa clone made with Arduino and ESP32."
      },
      {
        title: "OTI (Olympiad for Technical Informatics) - National Silver Medal",
        date: "2025",
        description: "Achieved a silver medal at the national level in the OTI competition."
      },
      {
        title: "Infoeducatie (Olympiad of Digital Inovation and Creation) - 4th place - WEB Development",
        date: "2025",
        description: "Achieved 4th place in the National of the Olympiad in the WEB Development category. Project: 2N2D "
      }
    ]
  },
  contact: {
    title: "Contact",
    color: "#1f2c44",
    content: {
      email: "mihaitelea02@gmail.com",
      linkedin: "https://www.linkedin.com/in/mihai-telea-131019393/",
      github: "https://github.com/Telea-Mihai",
      instagram: "https://www.instagram.com/telmihai_/",
    }
  }
};

function AboutMeContent() {
  const searchParams = useSearchParams();
  const [specialType, setSpecialType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dotSequence = [".", "..", "...", ""];
  const [dotIndex, setDotIndex] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && specialFloppyData[type]) {
      setSpecialType(type);
      setLoading(true);
      setTimeout(() => setLoading(false), 3100);
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotSequence.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (!specialType) return null;
    const data = specialFloppyData[specialType];

    switch (specialType) {
      case 'whoami':
        return (
          <div className="projectDisplay">
            <div className="flex flex-col gap-[0.2rem] ml-[2rem] mb-[1rem]">
              <h1 className="projectTitle boxflicker">{data.content.name}</h1>
              <h2 className="text-[1.5rem] mb-[1rem]">{data.content.role}</h2>
            </div>
            <div className="flex flex-col gap-[1rem] ml-[2rem] mr-[2rem]">
              <div>
                <h2 className="underline mb-[0.5rem]">About Me:</h2>
                <p>{data.content.bio}</p>
              </div>
              <div>
                <h2 className="underline mb-[0.5rem]">Location:</h2>
                <p>{data.content.location}</p>
              </div>
              <div>
                <h2 className="underline mb-[0.5rem]">Email:</h2>
                <a href={`mailto:${data.content.email}`} className="underline text-blue-500">{data.content.email}</a>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="projectDisplay">
            <h1 className="projectTitle boxflicker ml-[2rem] mt-[1rem]">Work Experience</h1>
            {data.content.map((exp: any, index: number) => (
              <div key={index} className="flex flex-col gap-[0.5rem] ml-[2rem] mr-[2rem] mb-[2rem] pb-[2rem]" style={{ borderBottom: index < data.content.length - 1 ? 'dashed 0.2rem #8B8B8B' : 'none' }}>
                <h2 className="text-[1.5rem] mt-[1rem]">{exp.position}</h2>
                <h3 className="text-[#ACACAC]">{exp.company} | {exp.period}</h3>
                <p className="mt-[0.5rem]">{exp.description}</p>
                <div className="mt-[0.5rem]">
                  <h3 className="underline">Technologies:</h3>
                  <div className="flex gap-[1rem] flex-wrap mt-[0.5rem]">
                    {exp.technologies.map((tech: string, i: number) => (
                      <span key={i} className="bg-[#2d2d2d] px-[0.5rem] py-[0.25rem] border border-[#8B8B8B]">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="projectDisplay">
            <h1 className="projectTitle boxflicker ml-[2rem] mt-[1rem]">Education</h1>
            {data.content.map((edu: any, index: number) => (
              <div key={index} className="flex flex-col gap-[0.5rem] ml-[2rem] mr-[2rem] mb-[2rem] pb-[2rem]" style={{ borderBottom: index < data.content.length - 1 ? 'dashed 0.2rem #8B8B8B' : 'none' }}>
                <h2 className="text-[1.5rem] mt-[1rem]">{edu.degree}</h2>
                <h3 className="text-[#ACACAC]">{edu.institution} | {edu.period}</h3>
                <h3 className="mt-[0.5rem]">Field: {edu.field}</h3>
                <div className="mt-[0.5rem]">
                  <h3 className="underline">Key Achievements:</h3>
                  <ul className="mt-[0.5rem]">
                    {edu.achievements.map((achievement: string, i: number) => (
                      <li key={i}>- {achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div className="projectDisplay">
            <h1 className="projectTitle boxflicker ml-[2rem] mt-[1rem]">Achievements</h1>
            {data.content.map((achievement: any, index: number) => (
              <div key={index} className="flex flex-col gap-[0.5rem] ml-[2rem] mr-[2rem] mb-[2rem] pb-[2rem]" style={{ borderBottom: index < data.content.length - 1 ? 'dashed 0.2rem #8B8B8B' : 'none' }}>
                <div className="flex justify-between items-center mt-[1rem]">
                  <h2 className="text-[1.5rem]">{achievement.title}</h2>
                  <span className="text-[#ACACAC]">{achievement.date}</span>
                </div>
                <p className="mt-[0.5rem]">{achievement.description}</p>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="projectDisplay">
            <div className="flex flex-col gap-[0.2rem] ml-[2rem] mb-[1rem]">
              <h1 className="projectTitle boxflicker">Contact Information</h1>
            </div>
            <div className="flex flex-col gap-[2rem] ml-[2rem] mr-[2rem] mt-[2rem]">
              <div>
                <h2 className="underline mb-[0.5rem]">Email:</h2>
                <a href={`mailto:${data.content.email}`} className="underline text-blue-500 text-[1.2rem]">{data.content.email}</a>
              </div>
              <div>
                <h2 className="underline mb-[0.5rem]">LinkedIn:</h2>
                <a href={data.content.linkedin} target="_blank" rel="noopener noreferrer" className="underline text-blue-500 text-[1.2rem]">{data.content.linkedin}</a>
              </div>
              <div>
                <h2 className="underline mb-[0.5rem]">GitHub:</h2>
                <a href={data.content.github} target="_blank" rel="noopener noreferrer" className="underline text-blue-500 text-[1.2rem]">{data.content.github}</a>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className={`viewLayout textFlicker screenGlare noise ${showContent ? 'showContent' : ''}`}>
      <div className="scanLines" />
      <button className="mobileToggle" onClick={() => setShowContent(!showContent)}>
        {showContent ? '< Menu' : 'Content >'}
      </button>
      {specialType ? (
        <div className="sideBar">
          <div className="flex flex-col gap-[0.2rem]">
            <Title content={`>${specialFloppyData[specialType].title.toUpperCase()}`} color={specialFloppyData[specialType].color} />
            <h2 className="text-[#ACACAC] mt-[0.3rem]">About Me</h2>
          </div>
          <Button content="eject disk" color="RED" onClick={() => { window.location.href = "/" }} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">Loading data...</div>
      )}
      {loading ? (
        <div className="flex w-full h-full justify-center items-center">
          Loading data{dotSequence[dotIndex]}
        </div>
      ) : (
        renderContent()
      )}
    </main>
  );
}

export default function AboutMePage() {
  return (
    <Suspense fallback={
      <main className="viewLayout textFlicker screenGlare noise showContent">
        <div className="scanLines" />
        <div className="flex justify-center items-center w-full h-full">Loading...</div>
      </main>
    }>
      <AboutMeContent />
    </Suspense>
  );
}