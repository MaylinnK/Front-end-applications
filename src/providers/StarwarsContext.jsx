// import { createContext, useState, useEffect } from "react";
// // import * as d3 from "d3";

// const BerryContext = createContext("null");

// export const BerryProvider = ({ children }) => {
//   const [json, setJson] = useState(null);
//   useEffect(() => {
//     fetch("https://pokeapi.co/api/v2/berry/").then(berryData => {
//       console.log(children);
//     })
//     .then(data => {
//       console.log(data)
//       return (
//         <BerryContext.Provider value={data}>{children}</BerryContext.Provider>
//       );
//     })
//   }, []);
// };
  

// export default BerryContext

import { createContext, useState, useEffect } from "react";

const StarWarsContext = createContext(null);

export const StarwarsProvider = ({ children }) => {
  const [json, setJson] = useState(null);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/berry/").then((starwarsData) => starwarsData.json())
    .then(data => {
      setJson(data)
    })
  }, []);

  return (
    <StarWarsContext.Provider value={json}>{children}</StarWarsContext.Provider>
  );
};

export default StarWarsContext;
