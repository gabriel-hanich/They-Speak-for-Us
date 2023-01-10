import styled from "styled-components";
import Field from "../items/inputs/Field";
import { useState } from "react";
import StyleButton from "../items/inputs/StyleButton";
import { createAccount } from "../../services/accounts";
import LoadingWheel from "../items/LoadingWheel";
import { BackendStatus } from "../../types";
import { VerifyEmail } from "../../services/getData";

const Container = styled.div`
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-areas: 
        "heading heading"
        "emailLabel emailInput"
        "accessPinLabel accessPinInput"
        "passwordLabel passwordInput"
        "confirmPasswordLabel confirmPasswordInput"
        "goBtn goBtn"
        "status status";
`



const JoinForm: React.FC<{setUserKey: any}> = ({setUserKey})=>{
    const [status, setStatus] = useState("");
    const [errorText, setErrorText] = useState("");
    const [email, setEmail] = useState("");
    const [accessPin, setAccessPin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const testDetails = ()=>{
        if(!VerifyEmail(email)){ // Ensure the inputted email is valid
            setStatus("error");
            setErrorText("Your Email is invalid");
            document.getElementById("emailInput")!.style.background = "rgba(255, 0, 0, 0.45)";
            return
        }

        if(password !== confirmPassword){ // Ensure the confirmed passwords match each other
            setStatus("error");
            setErrorText("The two passwords don't match");
            document.getElementById("passwordInput")!.style.background = "rgba(255, 0, 0, 0.45)";
            document.getElementById("confirmPasswordInput")!.style.background = "rgba(255, 0, 0, 0.45)";
            return;
        }
        
        setStatus("loading")
        makeAccount();
    }

    const makeAccount = ()=>{
        console.log("HI");
        createAccount(email, accessPin, password).then((res: BackendStatus)=>{
            if(res.success){
                console.log(res);
                console.log(setUserKey);
                setUserKey(res.comment);
                window.location.href = "/explore";
            }else{
                setStatus("error");
                setErrorText(`${res.status} - ${res.comment}`);

                if(res.status === 401){
                    document.getElementById("accessPinInput")!.style.background = "rgba(255, 0, 0, 0.45)";
                }
            }
        })
    }

    return (
        <Container>
                <div style={{gridArea: "heading", height: "100%", width: "100%", textAlign: "center"}}>
                    <h1 style={{fontSize: "2.5rem"}}>Welcome!</h1>
                </div>
                <div style={{gridArea: "emailLabel", height: "100%", width: "100%", textAlign: "left", marginLeft: "15px"}}>
                    <h2 style={{fontSize: "2rem"}}>Email: </h2>
                </div>
                <div style={{gridArea: "emailInput", height: "50%", width: "95%", margin: "auto"}}>
                    <Field setVal={setEmail} onSubmit={()=> document.getElementById("accessPinInput")?.focus()} id="emailInput"></Field>
                </div>
                <div style={{gridArea: "accessPinLabel", height: "100%", width: "100%", textAlign: "left", marginLeft: "15px"}}>
                    <h2 style={{fontSize: "2rem"}}> Access Pin: </h2>
                </div>
                <div style={{gridArea: "accessPinInput", height: "50%", width: "95%", margin: "auto", marginTop: "15px"}}>
                    <Field setVal={setAccessPin} onSubmit={()=> document.getElementById("passwordInput")?.focus()} id="accessPinInput"></Field>
                </div>
                <div style={{gridArea: "passwordLabel", height: "100%", width: "100%", textAlign: "left", marginLeft: "15px"}}>
                    <h2 style={{fontSize: "2rem"}}>Password: </h2>
                </div>
                <div style={{gridArea: "passwordInput", height: "50%", width: "95%", margin: "auto"}}>
                    <Field setVal={setPassword} onSubmit={()=> document.getElementById("confirmPasswordInput")?.focus()} type="password" id="passwordInput"></Field>
                </div>
                <div style={{gridArea: "confirmPasswordLabel", height: "100%", width: "100%", textAlign: "left", marginLeft: "15px"}}>
                    <h2 style={{fontSize: "2rem"}}> Confirm: </h2>
                </div>
                <div style={{gridArea: "confirmPasswordInput", height: "50%", width: "95%", margin: "auto", marginTop: "15px"}}>
                    <Field setVal={setConfirmPassword} onSubmit={testDetails} type="password" id="confirmPasswordInput"></Field>
                </div>
                <div style={{gridArea: "goBtn", height: "100%", maxHeight: "55px", width: "35%", margin: "auto", marginTop: "20px"}}>
                    <StyleButton text={status === "loading" ? "Loading" : "Go"} onClick={testDetails}></StyleButton>
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

export default JoinForm;