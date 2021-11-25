import { useContext } from "react";
import StarWarsContext from "../providers/StarwarsContext";

const Name = () => {
  let data = useContext(StarWarsContext);
  data = data?.results;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    return <h1>{data[1].name}</h1>;
  }
  //  return <h1>"hey"</h1>
};

export default Name;
