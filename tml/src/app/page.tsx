import Screen from "./components/Screen";
import "./home.css";

export default function Home() {
  return (
    <main className="homeLayout">
      <div className="Menu">
        <div>
          <h1 className="title">&gt;Menu</h1>
          <h2 className="subTitle">Please make button selection:</h2>
        </div>
        <div>
          <div className="Category">
            <h1 className="selected">Projects</h1>
            <button className="selected">Web</button>
            <button>Software/Games</button>
            <button>Hardware</button>
            <button>Other</button>
          </div>
          <div className="Category">
            <h1>About me</h1>
            <button>Who am I?</button>
            <button>Experience</button>
            <button>Education</button>
            <button>Achievements</button>
            <button>Contact</button>
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
            <Screen sum={null}/>
          </div>
        </div>
      </div>

    </main>
  )
}
