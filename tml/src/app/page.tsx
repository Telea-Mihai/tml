import Image from "next/image";
import "./home.css";

export default function Home() {
  return (
    <main className="homeLayout">
      <div className="Menu">
        <div>
          <h1 className="title">&gt;Menu</h1>
          <h2 className="subTitle">Please make a selection:</h2>
        </div>
        <div>
          <div className="Category">
            <h1 className="selected">Projects</h1>
            <a className="selected">Web</a>
            <a>Software/Games</a>
            <a>Hardware</a>
            <a>Other</a>
          </div>
          <div className="Category">
            <h1>About me</h1>
            <a>Who am I?</a>
            <a>Experience</a>
            <a>Education</a>
            <a>Achievements</a>
            <a>Contact</a>
          </div>
        </div>
      </div>
      <div className="Machine">
        <div className="Upper">
          <img src="/Logo.svg" alt="TML Logo" className="Logo" />
          <h2>Making cool stuff that also works. <br></br> (sometimes)</h2>
        </div>
        <div className="Lower">
          <div className="Screen">

          </div>
        </div>
      </div>

    </main>
  )
}
