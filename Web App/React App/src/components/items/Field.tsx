import { ChangeEvent } from "react";
import styled from "styled-components";

const TextField = styled.input`
    height: 100%;
    width: 100%;
    border: none;
    background: rgba(0, 0, 0, 0.15);
    font-size: 1.5rem;
`

const Field: React.FC<{setVal: React.Dispatch<React.SetStateAction<string>>, id: string, onSubmit: any, type?: string}> = ({setVal, onSubmit, id, type="text"})=>{
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        setVal((event.target as HTMLInputElement).value);
        if(event.key === "Enter"){
            onSubmit();
        }
    }

    return (
        <TextField onKeyUp={(event)=> handleKeyPress(event)} type={type} id={id}></TextField>
    )
}
export default Field;