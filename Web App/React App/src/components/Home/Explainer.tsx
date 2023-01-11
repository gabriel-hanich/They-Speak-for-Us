import styled from "styled-components";
import StoryThumbnail from "./StoryThumbnail";
import Card from "../items/cards/Card";
import { useEffect, useState } from "react";
import { getArticleCount } from "../../services/getData";

const Container = styled.div`
    width: 100vw;
    heigth: fit-content;
    min-height: 500px;
    background: #74ada2;
`

const TitleContainer = styled.div`
    width: fit-content;
    max-width: 1200px;
    height: auto;
    margin: auto;
`

const StoryContainer = styled.div`
    max-width: 1200px;
    height: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 150px;
`

const CardContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    height: 400px;
    margin: 20px auto; 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Explainer: React.FC<{}> = ()=>{
    const [articleCount, setArticleCount] = useState<number>(0);
    const [outletCount, setOutletCount] = useState<number>(0);
    const [daysActive, setDaysActive] = useState<number>(0);
    
    useEffect(() => {
        getArticleCount().then((vals)=>{
            setArticleCount(vals["articles"]);
            setOutletCount(vals["outlets"]);
        });

        let startDate: number = new Date("2021-10-15T00:00:00+11:00").getTime();
        let currentDate: number = new Date().getTime();
        let dateRange =  currentDate - startDate;
        setDaysActive(Math.floor(dateRange / (1000 * 3600 * 24)));
    }, [])
    

    return (
        <Container>
            <TitleContainer>
                <h1 style={{fontSize: "3rem", textAlign: "center"}}>Things Happen Fast</h1>
                <p style={{fontSize: "1.5rem"}}>
                    We ruly on news outlets to give us unbiased, factual accounts of events as soon as they occur.
                    <i>They Speak for Us</i> looks to understand how the press covers current affairs at a macro scale.
                    Our dataset continually collates the newest articles from major outlets, and then allows for large-scale 
                    analysis of this data. The dataset contains coverage of the entire Russia-Ukraine War, the U.S Midterm elections
                    and much more. 
                </p>
            </TitleContainer>
            <CardContainer>
                <Card title="Number of Collected Articles" value={articleCount.toLocaleString()}></Card>
                <Card title="Number of Surveyed Outlets" value={outletCount.toLocaleString()}></Card>
                <Card title="Days Active" value={daysActive.toLocaleString()}></Card>
            </CardContainer>
            <h1 style={{width: "1200px", margin: "20px auto", marginTop: "50px", fontSize: "4rem"}}>Stories</h1>
            <StoryContainer>
                <div style={{height: "350px", width: "1200px"}}>
                    <StoryThumbnail
                        imgUrl="https://static.politico.com/46/c7/e6b037214767bf84309d2356f1dc/trump-gop-future-35302.jpg"
                        title="How Mar-A-Lago Broke"
                        date = {new Date("2023-01-07T00:00:00+11:00")}
                        description="How did the press respond to the raid of Donald Trump's estate at Mar-A-Lago."
                        link="/They-Speak-for-Us/#/stories/raid"
                        author="Gabriel H"
                    ></StoryThumbnail>
                </div>
            </StoryContainer>
        </Container>
    )
}

export default Explainer;