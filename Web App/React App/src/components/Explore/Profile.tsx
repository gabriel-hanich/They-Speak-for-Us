import styled from "styled-components";
import { ProfileData } from "../../types";

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 35px;
    display: grid;
    grid-template-areas:
        "photo photo"
        "accountTag accountTag"
        "followCount followerCount"
        "accountDate accountAge"
        ;
`

const SubText = styled.i`
    font-style: normal;
    font-size: 1.65rem;
    color: rgba(255, 255, 255, 0.45);
`

const Profile: React.FC<{data: ProfileData}> = ({data})=>{
    const elemContainerStyle = {height: "100%", width: "100%", margin: "auto",display: "flex", justifyContent: "center", alignItems: "center", alignText: "center"};
    return (
        <Container className="frosted">
            <div style={{...elemContainerStyle, "gridArea": "photo", height: "200px"}}>
                <img src={data["imgLink"]} alt="" style={{borderRadius: "100%", height: "100%"}}/>
            </div>
            <div style={{...elemContainerStyle, "gridArea": "accountTag"}}>
                <h1 style={{textAlign: "center"}}><SubText>{data["at"]}</SubText><br></br>{data["name"]}</h1>
            </div>
            <div style={{...elemContainerStyle, "gridArea": "followerCount"}}>
                <h1 style={{textAlign: "center"}}><SubText>Followers</SubText><br></br>{data["followingCount"].toLocaleString()}</h1>
            </div>
            <div style={{...elemContainerStyle, "gridArea": "followCount"}}>
                <h1 style={{textAlign: "center"}}><SubText>Following</SubText><br></br>{data["followCount"].toLocaleString()}</h1>
            </div>

        </Container>
    )
}

export default Profile;