import styled from 'styled-components'
import LoginButton from './LoginButton'
import JoinButton from './JoinButton'
import logo from "../../../imgs/logo.png";
import StyleButton from '../StyleButton';


const Container = styled.div`
    width: 100vw;
    height: 75px;
    margin: 0px;

    display: grid;
    grid-template-areas: 'logo logo filler filler filler filler filler filler filler elem1 elem2';
`

const BottomBorder = styled.div`
    width: 100vw;
    height: 10px;
    margin: 0px;
    background: #2C3E50; 
    background: linear-gradient(to right, #4CA1AF, #2C3E50,#4CA1AF); 
`

const NavBar: React.FC<{isSignedIn: boolean}> = ({isSignedIn})=>{
    const logOut = ()=>{
        localStorage.clear();
        window.location.reload();
    }
    
    return (
        <div style={{overflowX: "hidden"}}>
            <Container className='frosted'>
                <div style={{height: "100%", width: "100%", gridArea: "logo", display: "flex", flexDirection: "row", alignItems: "center", gap: "15px"}}>
                    <a href="/">
                        <img src={logo} style={{height: "75px", width: "auto", marginLeft: "15px"}}/>
                    </a>
                    <h1>They Speak for Us</h1>
                </div>
                {
                    !isSignedIn ? 
                    <div style={{height: "80%", width: "80%", gridArea: "elem1", margin: "auto"}}>
                        <LoginButton></LoginButton>
                    </div>
                    : 
                    <div className=""></div>
                }
                <div style={{height: "75%", width: "80%", gridArea: "elem2", margin: "auto"}}>
                    {
                        !isSignedIn ? 
                            <JoinButton></JoinButton>
                        :
                            <StyleButton text="Logout" onClick={logOut}></StyleButton>
                    }
                    
                </div>
            </Container>
            <BottomBorder></BottomBorder>
        </div>
    )
} 

export default NavBar