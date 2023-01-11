import styled from "styled-components"
import Field from "../items/inputs/Field"
import { useState } from "react";
import LoadingWheel from "../items/LoadingWheel";
import StyleButton from "../items/inputs/StyleButton";
import { VerifyEmail } from "../../services/getData";
import { loginAccount } from "../../services/accounts";
import { BackendStatus } from "../../types";

const Container = styled.div`
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-areas: 
        "heading heading"
        "emailLabel emailInput"
        "passwordLabel passwordInput"
        "goBtn goBtn"
        "status status";
`


const LoginForm: React.FC<{setUserKey: any}> = ({setUserKey})=>{
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");

    const login = ()=>{
        if(!VerifyEmail(email)){ // Ensure invalid emails aren't sent through
            setStatus("error");
            setErrorText('Your Email is Invalid');
            return
        }
        setStatus("loading");
        loginAccount(email, password).then((res: BackendStatus)=>{
            if(res.success){
                window.location.href = "/They-Speak-for-Us/#/explore";
                setUserKey(res.comment);
            }else{
                setStatus("error");
                setErrorText(res.comment);
            }
        });
    }

    return (
        <Container>
            <div style={{gridArea: "heading", height: "100%", width: "100%", textAlign: "center"}}>
                    <h1 style={{fontSize: "2.5rem"}}>Hello!</h1>
                </div>
                <div style={{gridArea: "emailLabel", height: "100%", width: "100%", textAlign: "left", marginLeft: "15px"}}>
                    <h2 style={{fontSize: "2rem"}}>Email: </h2>
                </div>
                <div style={{gridArea: "emailInput", height: "50%", width: "95%", margin: "auto"}}>
                    <Field setVal={setEmail} onSubmit={()=> document.getElementById("passwordInput")?.focus()} id="emailInput"></Field>
                </div>
                <div style={{gridArea: "passwordLabel", height: "100%", width: "100%", textAlign: "left", marginLeft: "15px"}}>
                    <h2 style={{fontSize: "2rem"}}>Password: </h2>
                </div>
                <div style={{gridArea: "passwordInput", height: "50%", width: "95%", margin: "auto"}}>
                    <Field setVal={setPassword} onSubmit={login} type="password" id="passwordInput"></Field>
                </div>
                <div style={{gridArea: "goBtn", height: "100%", maxHeight: "55px", width: "35%", margin: "auto", marginTop: "20px"}}>
                    <StyleButton text={status === "loading" ? "Loading" : "Go"} onClick={login}></StyleButton>
                </div>
                <div style={{gridArea: "status", height: "100%", width: "100%", margin: "auto", marginTop: "50px"}}>
                    {status ==="loading" ?                     
                        <div style={{height: "75px", width: "75px", margin: "auto", marginBottom: "100px"}}>
                            <LoadingWheel></LoadingWheel>
                        </div>: <></>
                    }
                    {
                        status === "error" ?
                        <div style={{height: "100%", width: "fit-content", maxWidth: "500px", padding: "10px", margin: "auto", textAlign: "center", background: "rgba(0, 0, 0, 0.15)"}}>
                            <p style={{fontSize: "1.5rem"}}>{errorText}</p>
                        </div>: <></>
                    }
                </div>
        </Container>
    )
}

export default LoginForm