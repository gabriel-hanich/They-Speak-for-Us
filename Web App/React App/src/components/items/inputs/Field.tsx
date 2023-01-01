import { useEffect } from "react";
import styled from "styled-components";

const TextField = styled.input`
    height: 100%;
    width: 100%;
    border: none;
    background: rgba(0, 0, 0, 0.15);
    font-size: 1.5rem;
    font-family: 'Inter', sans-serif;
    color-scheme: dark;
    ${({ type }) => type === "date" && `
        &:hover{
            cursor: pointer;
        }
    `}
`

const Field: React.FC<{setVal: React.Dispatch<React.SetStateAction<any>>, id: string, onSubmit: any, type?: string, initValue?: any}> = ({setVal, onSubmit, id, type="text", initValue=""})=>{
    useEffect(()=>{
        if(initValue !== ""){
            if(type === "date"){
                (document.getElementById(id) as HTMLInputElement).valueAsDate = initValue;
            }else{
                (document.getElementById(id) as HTMLInputElement).value = initValue;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initValue])
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        setVal((event.target as HTMLInputElement).value);
        if(event.key === "Enter"){
            onSubmit();
        }
    }

    const handleChange = (event: any)=>{
        if(type === "date"){
            setVal(new Date(event.target.value));
        }else{
            setVal(event.target.value)
        }
    }
    
    return (
        <TextField onKeyUp={(event)=> handleKeyPress(event)} type={type} id={id} onChange={(event)=> handleChange(event)}></TextField>
    )
}
export default Field;