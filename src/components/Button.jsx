const Button = ({berry}) => {

    return <>
        <input type="radio" name="berry" id="0" value= {berry}></input>
        <label for="0">{ berry }<img src={`/${berry}.png`}/></label>
    </>
    
}

export default Button