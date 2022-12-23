import styled from "styled-components"
import NavBar from "../components/items/Navbar/Navbar"
import WelcomeText from "../components/Home/WelcomeText"
import Explainer from "../components/Home/Explainer"


const OpeningContainer = styled.div`
    height: fit-content;
    min-height: 60vh;
    width: 100vw;
    margin-top: 0px;
`


const Home:React.FC<{isSignedIn: boolean}> = ({isSignedIn})=>{
    return (
        <>
            <NavBar isSignedIn={isSignedIn}></NavBar>
            <div>
                <OpeningContainer>
                    <div style={{margin: "auto", marginTop: "150px"}}>
                        <WelcomeText isSignedIn={isSignedIn}></WelcomeText>
                    </div>
                </OpeningContainer>
                <Explainer></Explainer>
            </div>
        </>
    )
}

export default Home