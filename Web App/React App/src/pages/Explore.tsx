import styled from "styled-components"
import NavBar from "../components/items/Navbar/Navbar"
import Profile from "../components/Explore/Profile"
import Statistic from "../components/Explore/Statistic"

const Content = styled.div`
    height: fit-content;
    width: 100vw;

    margin-top: 50px;
    margin-left: 10px;
    padding-bottom: 150px;
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: top;
    justify-content: left;
`

const LeftPane = styled.div`
    flex: 0.35;
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ProfileContainer = styled.div`
    flex: 0.75;
`

const NumberStats = styled.div`
    flex: 0.25;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
`

const RightPane = styled.div`
    flex: 0.6;
    width: 100%;
    height: 90vh;
`

const Explore: React.FC<{userKey: string}> = ({userKey})=>{
    const queryParams = new URLSearchParams(window.location.search);

    return (
        <>
            <NavBar isSignedIn={userKey !== ""}></NavBar>
            <Content>
                <LeftPane>
                    <ProfileContainer>
                        <Profile data={{
                            "at": (queryParams.get("account") as string), 
                            "name": "John Doe",
                            "followCount": 100000,
                            "followingCount": 75,
                            "tweetCount": 100000,
                            "imgLink": "https://picsum.photos/1920",
                            }}></Profile>
                    </ProfileContainer>
                    <NumberStats>
                        <div style={{height: "100%", width: "100%"}}>
                            <Statistic label="Total Tweets" value={61}></Statistic>
                        </div>    
                        <div style={{height: "100%", width: "100%"}}>
                            <Statistic label="Average Daily Tweets" value={64.5}></Statistic>
                        </div>    
                    </NumberStats>   
                </LeftPane>          
                <RightPane></RightPane>          
            </Content>
        </>
    )
}

export default Explore