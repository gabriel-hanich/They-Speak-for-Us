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
`

const LoginButton: React.FC<{}> = ({})=>{
    return (
        <a href="">
            <Button className="frosted">Login</Button>
        </a>
    )
}

export default LoginButton;