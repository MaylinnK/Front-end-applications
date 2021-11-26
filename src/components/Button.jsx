import { useContext, Fragment } from "react";
import BerryContext from "../providers/BerryContext";

const Name = () => {
  let data = useContext(BerryContext);
  console.log(data);
  if (!data) {
    return <h1>"hey"</h1>;
  }
  return (
    <>
      {data.map((berry) => (
        <Fragment key={berry.id}>
          <input type="radio" name="berry" id={berry.id -1} value={berry.name}></input>
          <label htmlFor={berry.id -1}>
            {berry.name}
            <img src={`/${berry.name}.png`} />
          </label>
        </Fragment>
      ))}
    </>
  );
};

export default Name;
