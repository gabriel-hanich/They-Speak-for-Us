import styled from "styled-components"

const Button = styled.button`
    height: 100%;
    width: 100%;
    cursor: pointer;
    background: rgba(0, 0, 0, 0); 
    border: 2px rgba(0, 0, 0, 0.55) solid;
    color: #000;
    font-size: 2rem;
    letter-spacing: 0px;
    transition: all 0.5s ease;
    border-radius: 15px;
    
    :hover{
        background: rgba(0, 0, 0, 0.55); 
        color: #fff;
        background-position: 50% 0%;
    }
`
const StyleButton: React.FC<{text: String, onClick: any}> = ({text, onClick})=>{
    return (
        <Button onClick={onClick}>{text}</Button>
    )
}

export default StyleButton