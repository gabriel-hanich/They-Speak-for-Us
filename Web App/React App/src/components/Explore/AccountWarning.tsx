import styled from "styled-components"
import JoinButton from "../items/Navbar/JoinButton"
import LoginButton from "../items/Navbar/LoginButton"

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0%;
    left: 0%;
    background: rgba(0, 0, 0, 0.75);
    display: grid;
    place-items: center;
    z-index: 3;
    
    `

const WarningContainer = styled.div`
    height: fit-content;
    min-height: 80vh;
    
    width: 30vw;
    
    background: #1D2D45;
    text-align: center;
    padding: 20px;
    z-index: 4;
`

const ButtonContainer = styled.div`
    height: 75px;
    width: 85%;
    gap: 5px;
    margin: auto;
    display: flex;
    margin-bottom: 50px;
`

const AccountWarning: React.FC<{}> = ()=>{
    return (
        <Container>
            <WarningContainer>
                <h1>Oops..</h1>
                <p style={{fontSize: "1.5rem"}}>You need an account to explore 'They Speak for Us'. Simply create one below</p>
                <ButtonContainer>
                    <div style={{width: "100%"}}>
                        <LoginButton></LoginButton>
                    </div>
                    <div style={{width: "100%"}}>
                        <JoinButton></JoinButton>
                    </div>
                </ButtonContainer>
                <a href="/" style={{fontSize: "1.1rem"}}>
                    Home
                </a>
            </WarningContainer>
        </Container>
    )
}

export default AccountWarning;