import "./App.css";
import { BerryProvider } from "./providers/BerryContext";
import Menu from "./components/Menu";
import RadarChart from "./components/Radar";

export default function App() {
  return (
    <BerryProvider>
      <div className="App">
        <Menu />
        <main>
          <h1></h1>
          <section>
            <article>
              <img src="/textlabel.svg" alt="label"/>
              <p>
                Firmness: <span id="firmness"></span>
              </p>
            </article>
            <article>
            <img src="/textlabel.svg" alt="label"/>
              <p>
                Growth time: <span id="growth"></span>
              </p>
            </article>
            <article>
            <img src="/textlabel.svg" alt="label"/>
              <p>
                Max harvest: <span id="harvest"></span>
              </p>
            </article>
            <article>
            <img src="/textlabel.svg" alt="label"/>
              <p>
                Size: <span id="size"></span>
              </p>
            </article>
            <article>
            <img src="/textlabel.svg" alt="label"/>
              <p>
                Smoothness: <span id="smoothness"></span>
              </p>
            </article>
            <article>
            <img src="/textlabel.svg" alt="label"/>
              <p>
                Soil dryness: <span id="dryness"></span>
              </p>
            </article>
          </section>
          <RadarChart />
        </main>
      </div>
    </BerryProvider>
  );
}
