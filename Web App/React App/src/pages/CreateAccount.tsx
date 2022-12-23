import styled from "styled-components";
import JoinForm from "../components/Join/JoinForm";

const FormContainer = styled.div`
    height: fit-content;
    width: fit-content;
    
    min-height: 650px;
    min-width: 600px;

    margin: auto;
    margin-top: 5%;
`

const CreateAccount: React.FC<{setUserKey: any}> = ({setUserKey})=>{
    return (
        <FormContainer className="frosted">
            <JoinForm setUserKey={setUserKey}></JoinForm>
        </FormContainer>
    )
}

export default CreateAccount;
