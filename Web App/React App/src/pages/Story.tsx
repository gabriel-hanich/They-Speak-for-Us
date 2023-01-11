import styled from "styled-components";
import Navbar from "../components/items/Navbar/Navbar";
import { TopicVals } from "../types";
import { useEffect, useState } from "react";
import Graph from "../components/items/Graph";
import { StoryContent, StoryContentHeading, StoryContentSubHeading, StoryGraphContainer, StoryHeadingContainer, StoryImageContainer, StoryImageText, StorySubheading, StoryText } from "../components/stories/storyElements";


const Opener = styled.div`
    min-height: 60vh;
    height: fit-content;
    padding: 75px 0px;
    width: 100vw;
    background: radial-gradient(
        at 50% 50%,
        hsla(193, 95%, 65%, 1) 0px,
        transparent 100%
    ),
    radial-gradient(
        at 0% 0%,
        hsla(162, 100%, 56%, 1) 0px,
        transparent 100%
    ),
    radial-gradient(
        at 100% 0%,
        hsla(212, 94%, 28%, 1) 0px,
        transparent 50%
    ),
    radial-gradient(
        at 0% 100%,
        hsla(265, 71%, 35%, 1) 0px,
        transparent 50%
    ),
    radial-gradient(
        at 100% 100%,
        hsla(257, 100%, 75%, 1) 0px,
        transparent 50%
    );
`

const Story: React.FC<{isSignedIn: boolean}> = ({isSignedIn})=>{
    const ImageStyle = {width: "auto", height: "350px"}
    const [graphData, setGraphData] = useState<Array<TopicVals[]>>([]);
    const [accurateGraphData, setAccurateGraphData] = useState<boolean>(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
        const graphData = [{"id":"1673085796776","title":"Fox News","color":"#D90429","points":[{"x":"2022-08-01T00:00:00.000Z","y":2},{"x":"2022-08-02T00:00:00.000Z","y":0},{"x":"2022-08-03T00:00:00.000Z","y":2},{"x":"2022-08-04T00:00:00.000Z","y":3},{"x":"2022-08-05T00:00:00.000Z","y":4},{"x":"2022-08-06T00:00:00.000Z","y":1},{"x":"2022-08-07T00:00:00.000Z","y":3},{"x":"2022-08-08T00:00:00.000Z","y":2},{"x":"2022-08-09T00:00:00.000Z","y":18},{"x":"2022-08-10T00:00:00.000Z","y":14},{"x":"2022-08-11T00:00:00.000Z","y":10},{"x":"2022-08-12T00:00:00.000Z","y":10},{"x":"2022-08-13T00:00:00.000Z","y":9},{"x":"2022-08-14T00:00:00.000Z","y":7},{"x":"2022-08-15T00:00:00.000Z","y":4},{"x":"2022-08-16T00:00:00.000Z","y":4},{"x":"2022-08-17T00:00:00.000Z","y":8},{"x":"2022-08-18T00:00:00.000Z","y":5},{"x":"2022-08-19T00:00:00.000Z","y":6},{"x":"2022-08-20T00:00:00.000Z","y":5},{"x":"2022-08-21T00:00:00.000Z","y":4},{"x":"2022-08-22T00:00:00.000Z","y":5},{"x":"2022-08-23T00:00:00.000Z","y":3},{"x":"2022-08-24T00:00:00.000Z","y":5},{"x":"2022-08-25T00:00:00.000Z","y":3},{"x":"2022-08-26T00:00:00.000Z","y":3},{"x":"2022-08-27T00:00:00.000Z","y":5},{"x":"2022-08-28T00:00:00.000Z","y":3},{"x":"2022-08-29T00:00:00.000Z","y":3},{"x":"2022-08-30T00:00:00.000Z","y":4},{"x":"2022-08-31T00:00:00.000Z","y":5},{"x":"2022-09-01T00:00:00.000Z","y":5},{"x":"2022-09-02T00:00:00.000Z","y":2},{"x":"2022-09-03T00:00:00.000Z","y":1},{"x":"2022-09-04T00:00:00.000Z","y":3},{"x":"2022-09-05T00:00:00.000Z","y":4},{"x":"2022-09-06T00:00:00.000Z","y":5},{"x":"2022-09-07T00:00:00.000Z","y":3},{"x":"2022-09-08T00:00:00.000Z","y":4},{"x":"2022-09-09T00:00:00.000Z","y":2},{"x":"2022-09-10T00:00:00.000Z","y":1},{"x":"2022-09-11T00:00:00.000Z","y":0},{"x":"2022-09-12T00:00:00.000Z","y":2},{"x":"2022-09-13T00:00:00.000Z","y":1},{"x":"2022-09-14T00:00:00.000Z","y":2},{"x":"2022-09-15T00:00:00.000Z","y":2},{"x":"2022-09-16T00:00:00.000Z","y":0},{"x":"2022-09-17T00:00:00.000Z","y":0},{"x":"2022-09-18T00:00:00.000Z","y":4},{"x":"2022-09-19T00:00:00.000Z","y":1},{"x":"2022-09-20T00:00:00.000Z","y":1},{"x":"2022-09-21T00:00:00.000Z","y":2},{"x":"2022-09-22T00:00:00.000Z","y":1},{"x":"2022-09-23T00:00:00.000Z","y":3},{"x":"2022-09-24T00:00:00.000Z","y":2},{"x":"2022-09-25T00:00:00.000Z","y":2},{"x":"2022-09-26T00:00:00.000Z","y":2},{"x":"2022-09-27T00:00:00.000Z","y":2},{"x":"2022-09-28T00:00:00.000Z","y":2},{"x":"2022-09-29T00:00:00.000Z","y":1},{"x":"2022-09-30T00:00:00.000Z","y":0}]},{"id":"1673085852941","title":"CNN","color":"#219EBC","points":[{"x":"2022-08-01T00:00:00.000Z","y":3},{"x":"2022-08-02T00:00:00.000Z","y":4},{"x":"2022-08-03T00:00:00.000Z","y":5},{"x":"2022-08-04T00:00:00.000Z","y":3},{"x":"2022-08-05T00:00:00.000Z","y":6},{"x":"2022-08-06T00:00:00.000Z","y":1},{"x":"2022-08-07T00:00:00.000Z","y":3},{"x":"2022-08-08T00:00:00.000Z","y":4},{"x":"2022-08-09T00:00:00.000Z","y":29},{"x":"2022-08-10T00:00:00.000Z","y":22},{"x":"2022-08-11T00:00:00.000Z","y":18},{"x":"2022-08-12T00:00:00.000Z","y":26},{"x":"2022-08-13T00:00:00.000Z","y":12},{"x":"2022-08-14T00:00:00.000Z","y":9},{"x":"2022-08-15T00:00:00.000Z","y":16},{"x":"2022-08-16T00:00:00.000Z","y":12},{"x":"2022-08-17T00:00:00.000Z","y":14},{"x":"2022-08-18T00:00:00.000Z","y":21},{"x":"2022-08-19T00:00:00.000Z","y":16},{"x":"2022-08-20T00:00:00.000Z","y":1},{"x":"2022-08-21T00:00:00.000Z","y":4},{"x":"2022-08-22T00:00:00.000Z","y":3},{"x":"2022-08-23T00:00:00.000Z","y":3},{"x":"2022-08-24T00:00:00.000Z","y":7},{"x":"2022-08-25T00:00:00.000Z","y":8},{"x":"2022-08-26T00:00:00.000Z","y":7},{"x":"2022-08-27T00:00:00.000Z","y":10},{"x":"2022-08-28T00:00:00.000Z","y":2},{"x":"2022-08-29T00:00:00.000Z","y":7},{"x":"2022-08-30T00:00:00.000Z","y":6},{"x":"2022-08-31T00:00:00.000Z","y":13},{"x":"2022-09-01T00:00:00.000Z","y":11},{"x":"2022-09-02T00:00:00.000Z","y":11},{"x":"2022-09-03T00:00:00.000Z","y":4},{"x":"2022-09-04T00:00:00.000Z","y":5},{"x":"2022-09-05T00:00:00.000Z","y":6},{"x":"2022-09-06T00:00:00.000Z","y":12},{"x":"2022-09-07T00:00:00.000Z","y":9},{"x":"2022-09-08T00:00:00.000Z","y":9},{"x":"2022-09-09T00:00:00.000Z","y":5},{"x":"2022-09-10T00:00:00.000Z","y":7},{"x":"2022-09-11T00:00:00.000Z","y":4},{"x":"2022-09-12T00:00:00.000Z","y":4},{"x":"2022-09-13T00:00:00.000Z","y":5},{"x":"2022-09-14T00:00:00.000Z","y":7},{"x":"2022-09-15T00:00:00.000Z","y":2},{"x":"2022-09-16T00:00:00.000Z","y":5},{"x":"2022-09-17T00:00:00.000Z","y":2},{"x":"2022-09-18T00:00:00.000Z","y":5},{"x":"2022-09-19T00:00:00.000Z","y":1},{"x":"2022-09-20T00:00:00.000Z","y":5},{"x":"2022-09-21T00:00:00.000Z","y":6},{"x":"2022-09-22T00:00:00.000Z","y":16},{"x":"2022-09-23T00:00:00.000Z","y":12},{"x":"2022-09-24T00:00:00.000Z","y":1},{"x":"2022-09-25T00:00:00.000Z","y":2},{"x":"2022-09-26T00:00:00.000Z","y":6},{"x":"2022-09-27T00:00:00.000Z","y":5},{"x":"2022-09-28T00:00:00.000Z","y":3},{"x":"2022-09-29T00:00:00.000Z","y":7},{"x":"2022-09-30T00:00:00.000Z","y":0}]}]
        let newGraphData: TopicVals[] =[];
        graphData.forEach((topic)=>{
            let topicData: TopicVals = {
                "id": topic["id"],
                "title": topic["title"],
                "color": topic["color"],
                "points": []
            };
            topic["points"].forEach((point)=>{
                let pointDate: Date = new Date(point["x"]);
                topicData["points"].push({"x": pointDate, "y": point["y"]})
            });
            newGraphData.push(topicData);
        });
        setGraphData([newGraphData]);
        setAccurateGraphData(true);

    }, [])

    return (
        <>
            <Navbar isSignedIn={isSignedIn}></Navbar>
            <Opener>
                <StoryHeadingContainer>
                    <h1 style={{fontSize: "5rem", marginLeft: "5px"}}>How Mar-A-Lago Broke</h1>
                </StoryHeadingContainer>
                <StorySubheading>
                    <h2 style={{marginLeft: "5px"}}>How did Legacy Media report on the FBI raid of Trump's estate in Florida?</h2>
                    <p style={{marginLeft: "5px"}}>By Gabriel H</p>
                </StorySubheading>
            </Opener>
            <StoryContent>
                <StoryContentHeading>Heading</StoryContentHeading>
                <StoryContentSubHeading>Subheading</StoryContentSubHeading>
                <StoryText>Body Text</StoryText>
                <StoryImageContainer alignment={"center"}>
                    <img style={ImageStyle} src="https://picsum.photos/1920/1080" alt="" />
                    <StoryImageText>Stock Photo from Lorem Picsum</StoryImageText>
                </StoryImageContainer>
                <StoryText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum a eos molestias quisquam consequatur voluptas quia saepe ipsum totam, quasi voluptatibus nemo hic placeat deserunt tenetur temporibus dolorem? Aliquam libero excepturi voluptas, facere hic mollitia provident similique. Tempore, et enim sed similique maxime, maiores accusamus quod praesentium repudiandae ipsam rem?</StoryText>
                <StoryContentHeading>Graph</StoryContentHeading>
                <StoryGraphContainer>
                    {
                        accurateGraphData
                        ?<Graph title="Mar-A-Lago Coverage by Outlet" data={graphData[0]}></Graph>
                        : <></>
                    }
                </StoryGraphContainer>
                <StoryText>Analysis of graph and data presented above</StoryText>
            </StoryContent>
        </>
    )
}

export default Story;