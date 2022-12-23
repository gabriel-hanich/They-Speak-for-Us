import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../items/SearchBar";
import StyleButton from "../items/StyleButton";

const nounList: string[] = ["News Media", "Trends", "Politics", "Legacy Media"]

const Container = styled.div`
    height: fit-content;
    width: 35vw;
    margin: auto;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
`

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`

const ChangeText = styled.h1`
    background: linear-gradient(to bottom, #67d6e7, #3a536d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;

    animation: slideIn 5s ease;
    animation-iteration-count: ${nounList.length - 0.5};
`

const WelcomeText: React.FC<{isSignedIn: boolean}> = ({isSignedIn})=>{
    const [count, setCount] = useState(0);


    useEffect(()=>{
        const newIntervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 5000);
    }, [])


    return (
        <Container className="frosted">
            <TextContainer>
                <h1 style={{fontSize: "2.5rem"}}>Study</h1>
                <ChangeText id="changeText">{nounList[count < nounList.length ? count : nounList.length - 1]}</ChangeText>
            </TextContainer>
                <div style={{width: "fit-content", minWidth: "60%", height: "50px", margin: "auto", marginBottom: "15px"}}>
                    {
                        isSignedIn ? 
                            <a href="/explore">
                                <StyleButton text={"Explore Our Data"} onClick={()=>console.log("bye")}></StyleButton>
                            </a>
                        :
                            <a href="/join">
                                <StyleButton text={"Make Account"} onClick={()=>console.log("bye")}></StyleButton>
                            </a>

                    }
                    
                </div>
        </Container>
    )
}

export default WelcomeText;