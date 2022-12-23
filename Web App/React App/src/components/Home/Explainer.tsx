import styled from "styled-components";
import StoryThumbnail from "./StoryThumbnail";

const Container = styled.div`
    width: 100vw;
    heigth: fit-content;
    min-height: 500px;
    background: #74ada2;
`

const TitleContainer = styled.div`
    width: fit-content;
    max-width: 1000px;
    height: auto;
    margin: auto;
`

const StoryContainer = styled.div`
    width: fit-content;
    max-width: 1000px;
    height: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    padding-bottom: 150px;
`

const Explainer: React.FC<{}> = ()=>{
    return (
        <Container>
            <TitleContainer>
                <h1 style={{fontSize: "3rem", textAlign: "center"}}>Things Happen Fast</h1>
                <p style={{fontSize: "1.5rem"}}>We rely on the news to give us an unbiased, factual account of events as soon as they happen. They Speak For Us looks at how the media represents the publics interests in reporting and coverage</p>
            </TitleContainer>
            <StoryContainer>
                <div style={{height: "350px", width: "1000px"}}>
                    <StoryThumbnail
                        imgUrl="https://picsum.photos/1920/1080"
                        title="Man Says thing on Twitter"
                        date = {new Date()}
                        description="lorem ipsum"
                        author="Me"
                        link="/"
                    ></StoryThumbnail>
                </div>
            </StoryContainer>
        </Container>
    )
}

export default Explainer;