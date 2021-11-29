import { createContext, useState, useEffect } from "react";

const BerryContext = createContext(null);

export const BerryProvider = ({ children }) => {
  const [json, setJson] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/berry/")
      .then((BerryData) => BerryData.json())
      .then((data) => {
        return Object.values(data.results).map((result) => {
          return fetch(result.url)
            .then((BerryData) => BerryData.json())
            .then((data) => {
              return data;
            });
        });
      })
      .then((allPromises) => {
        Promise.all(allPromises).then((allData) => {
          setJson(allData);
        });
      });
  }, []);
  return <BerryContext.Provider value={json}>{children}</BerryContext.Provider>;
};

export default BerryContext;
