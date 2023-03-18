import styled from "styled-components";

const Button = styled.button`
    height: 100%;
    width: 100%;
    cursor: pointer;
    border: none;
    font-size: 2rem;
    letter-spacing: 0px;
    transition: all 0.5s ease;
    border-radius: 15px;

    &:hover{
        background: rgba(0, 0, 0, 0.25);
    }
    @media (max-height: 1000px) {
        font-size: 1.5rem;
    }
`

const QuietButton: React.FC<{onClick?: any, label: string}> = ({onClick, label})=>{
    return (
        <Button className="frosted" onClick={onClick}>{label}</Button>
    )
}

export default QuietButton;