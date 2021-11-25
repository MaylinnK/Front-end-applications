import "./App.css";
import { StarwarsProvider } from "./providers/StarwarsContext";
import Name from "./components/Name";

export default function App() {
  return (
    <StarwarsProvider>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Name />
      </div>
    </StarwarsProvider>
  );
}