import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";

const FormContainer = styled.div`
    height: fit-content;
    width: fit-content;
    
    min-height: 650px;
    min-width: 600px;

    margin: auto;
    margin-top: 5%;
`


const Login: React.FC<{setUserKey: any}> = ({setUserKey})=>{
    return (
        <FormContainer className="frosted">
            <LoginForm setUserKey={setUserKey}></LoginForm>
        </FormContainer>
    )
}

export default Login