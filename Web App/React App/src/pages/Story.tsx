import styled from "styled-components";
import Navbar from "../components/items/Navbar/Navbar";
import { TopicVals } from "../types";
import { useEffect, useState } from "react";
import Graph from "../components/items/Graph";
import { StoryContent, StoryContentHeading, StoryContentSubHeading, StoryGraphContainer, StoryHeadingContainer, StoryImageContainer, StoryImageText, StorySubheading, StoryText, StyledTable} from "../components/stories/storyElements";


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
        // window.scrollTo(0, 0);
        const graphData = [{"id":"1673440754760","title":"Total Coverage","color":"#219EBC","points":[{"x":"2022-08-01T00:00:00.000Z","y":30},{"x":"2022-08-02T00:00:00.000Z","y":27},{"x":"2022-08-03T00:00:00.000Z","y":42},{"x":"2022-08-04T00:00:00.000Z","y":39},{"x":"2022-08-05T00:00:00.000Z","y":30},{"x":"2022-08-06T00:00:00.000Z","y":11},{"x":"2022-08-07T00:00:00.000Z","y":20},{"x":"2022-08-08T00:00:00.000Z","y":43},{"x":"2022-08-09T00:00:00.000Z","y":157},{"x":"2022-08-10T00:00:00.000Z","y":136},{"x":"2022-08-11T00:00:00.000Z","y":115},{"x":"2022-08-12T00:00:00.000Z","y":129},{"x":"2022-08-13T00:00:00.000Z","y":66},{"x":"2022-08-14T00:00:00.000Z","y":59},{"x":"2022-08-15T00:00:00.000Z","y":76},{"x":"2022-08-16T00:00:00.000Z","y":74},{"x":"2022-08-17T00:00:00.000Z","y":81},{"x":"2022-08-18T00:00:00.000Z","y":94},{"x":"2022-08-19T00:00:00.000Z","y":57},{"x":"2022-08-20T00:00:00.000Z","y":30},{"x":"2022-08-21T00:00:00.000Z","y":33},{"x":"2022-08-22T00:00:00.000Z","y":47},{"x":"2022-08-23T00:00:00.000Z","y":44},{"x":"2022-08-24T00:00:00.000Z","y":46},{"x":"2022-08-25T00:00:00.000Z","y":54},{"x":"2022-08-26T00:00:00.000Z","y":82},{"x":"2022-08-27T00:00:00.000Z","y":58},{"x":"2022-08-28T00:00:00.000Z","y":25},{"x":"2022-08-29T00:00:00.000Z","y":40},{"x":"2022-08-30T00:00:00.000Z","y":44},{"x":"2022-08-31T00:00:00.000Z","y":83},{"x":"2022-09-01T00:00:00.000Z","y":62},{"x":"2022-09-02T00:00:00.000Z","y":70},{"x":"2022-09-03T00:00:00.000Z","y":25},{"x":"2022-09-04T00:00:00.000Z","y":39},{"x":"2022-09-05T00:00:00.000Z","y":41},{"x":"2022-09-06T00:00:00.000Z","y":44},{"x":"2022-09-07T00:00:00.000Z","y":62},{"x":"2022-09-08T00:00:00.000Z","y":52},{"x":"2022-09-09T00:00:00.000Z","y":24},{"x":"2022-09-10T00:00:00.000Z","y":47},{"x":"2022-09-11T00:00:00.000Z","y":16},{"x":"2022-09-12T00:00:00.000Z","y":42},{"x":"2022-09-13T00:00:00.000Z","y":50},{"x":"2022-09-14T00:00:00.000Z","y":34},{"x":"2022-09-15T00:00:00.000Z","y":32},{"x":"2022-09-16T00:00:00.000Z","y":40},{"x":"2022-09-17T00:00:00.000Z","y":28},{"x":"2022-09-18T00:00:00.000Z","y":29},{"x":"2022-09-19T00:00:00.000Z","y":24},{"x":"2022-09-20T00:00:00.000Z","y":47},{"x":"2022-09-21T00:00:00.000Z","y":64},{"x":"2022-09-22T00:00:00.000Z","y":76},{"x":"2022-09-23T00:00:00.000Z","y":41},{"x":"2022-09-24T00:00:00.000Z","y":20},{"x":"2022-09-25T00:00:00.000Z","y":13},{"x":"2022-09-26T00:00:00.000Z","y":29},{"x":"2022-09-27T00:00:00.000Z","y":26},{"x":"2022-09-28T00:00:00.000Z","y":38},{"x":"2022-09-29T00:00:00.000Z","y":35},{"x":"2022-09-30T00:00:00.000Z","y":22},{"x":"2022-10-01T00:00:00.000Z","y":27},{"x":"2022-10-02T00:00:00.000Z","y":17},{"x":"2022-10-03T00:00:00.000Z","y":28},{"x":"2022-10-04T00:00:00.000Z","y":43},{"x":"2022-10-05T00:00:00.000Z","y":32},{"x":"2022-10-06T00:00:00.000Z","y":15},{"x":"2022-10-07T00:00:00.000Z","y":26},{"x":"2022-10-08T00:00:00.000Z","y":19},{"x":"2022-10-09T00:00:00.000Z","y":17},{"x":"2022-10-10T00:00:00.000Z","y":28},{"x":"2022-10-11T00:00:00.000Z","y":38},{"x":"2022-10-12T00:00:00.000Z","y":41},{"x":"2022-10-13T00:00:00.000Z","y":73},{"x":"2022-10-14T00:00:00.000Z","y":58},{"x":"2022-10-15T00:00:00.000Z","y":30},{"x":"2022-10-16T00:00:00.000Z","y":27},{"x":"2022-10-17T00:00:00.000Z","y":37},{"x":"2022-10-18T00:00:00.000Z","y":36},{"x":"2022-10-19T00:00:00.000Z","y":34},{"x":"2022-10-20T00:00:00.000Z","y":34},{"x":"2022-10-21T00:00:00.000Z","y":54},{"x":"2022-10-22T00:00:00.000Z","y":15},{"x":"2022-10-23T00:00:00.000Z","y":21},{"x":"2022-10-24T00:00:00.000Z","y":31},{"x":"2022-10-25T00:00:00.000Z","y":35},{"x":"2022-10-26T00:00:00.000Z","y":37},{"x":"2022-10-27T00:00:00.000Z","y":20},{"x":"2022-10-28T00:00:00.000Z","y":29},{"x":"2022-10-29T00:00:00.000Z","y":19},{"x":"2022-10-30T00:00:00.000Z","y":15},{"x":"2022-10-31T00:00:00.000Z","y":36},{"x":"2022-11-01T00:00:00.000Z","y":35},{"x":"2022-11-02T00:00:00.000Z","y":42},{"x":"2022-11-03T00:00:00.000Z","y":44},{"x":"2022-11-04T00:00:00.000Z","y":47},{"x":"2022-11-05T00:00:00.000Z","y":25},{"x":"2022-11-06T00:00:00.000Z","y":30},{"x":"2022-11-07T00:00:00.000Z","y":30},{"x":"2022-11-08T00:00:00.000Z","y":40},{"x":"2022-11-09T00:00:00.000Z","y":64},{"x":"2022-11-10T00:00:00.000Z","y":40},{"x":"2022-11-11T00:00:00.000Z","y":43},{"x":"2022-11-12T00:00:00.000Z","y":40},{"x":"2022-11-13T00:00:00.000Z","y":32},{"x":"2022-11-14T00:00:00.000Z","y":44},{"x":"2022-11-15T00:00:00.000Z","y":60},{"x":"2022-11-16T00:00:00.000Z","y":105},{"x":"2022-11-17T00:00:00.000Z","y":45},{"x":"2022-11-18T00:00:00.000Z","y":53},{"x":"2022-11-19T00:00:00.000Z","y":45},{"x":"2022-11-20T00:00:00.000Z","y":47},{"x":"2022-11-21T00:00:00.000Z","y":29},{"x":"2022-11-22T00:00:00.000Z","y":56},{"x":"2022-11-23T00:00:00.000Z","y":28},{"x":"2022-11-24T00:00:00.000Z","y":29},{"x":"2022-11-25T00:00:00.000Z","y":23},{"x":"2022-11-26T00:00:00.000Z","y":27},{"x":"2022-11-27T00:00:00.000Z","y":15},{"x":"2022-11-28T00:00:00.000Z","y":27},{"x":"2022-11-29T00:00:00.000Z","y":41},{"x":"2022-11-30T00:00:00.000Z","y":33},{"x":"2022-12-01T00:00:00.000Z","y":35},{"x":"2022-12-02T00:00:00.000Z","y":29},{"x":"2022-12-03T00:00:00.000Z","y":22},{"x":"2022-12-04T00:00:00.000Z","y":40},{"x":"2022-12-05T00:00:00.000Z","y":49},{"x":"2022-12-06T00:00:00.000Z","y":58},{"x":"2022-12-07T00:00:00.000Z","y":63},{"x":"2022-12-08T00:00:00.000Z","y":33},{"x":"2022-12-09T00:00:00.000Z","y":28},{"x":"2022-12-10T00:00:00.000Z","y":23},{"x":"2022-12-11T00:00:00.000Z","y":19},{"x":"2022-12-12T00:00:00.000Z","y":16},{"x":"2022-12-13T00:00:00.000Z","y":19},{"x":"2022-12-14T00:00:00.000Z","y":32},{"x":"2022-12-15T00:00:00.000Z","y":21},{"x":"2022-12-16T00:00:00.000Z","y":56},{"x":"2022-12-17T00:00:00.000Z","y":30},{"x":"2022-12-18T00:00:00.000Z","y":30},{"x":"2022-12-19T00:00:00.000Z","y":66},{"x":"2022-12-20T00:00:00.000Z","y":62},{"x":"2022-12-21T00:00:00.000Z","y":64},{"x":"2022-12-22T00:00:00.000Z","y":28},{"x":"2022-12-23T00:00:00.000Z","y":37},{"x":"2022-12-24T00:00:00.000Z","y":22},{"x":"2022-12-25T00:00:00.000Z","y":14},{"x":"2022-12-26T00:00:00.000Z","y":13},{"x":"2022-12-27T00:00:00.000Z","y":21},{"x":"2022-12-28T00:00:00.000Z","y":14},{"x":"2022-12-29T00:00:00.000Z","y":21},{"x":"2022-12-30T00:00:00.000Z","y":55},{"x":"2022-12-31T00:00:00.000Z","y":0}]}]
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
                <StoryText>On the 8th of August 2022, the world learned that the U.S Government had been the victim of espionage. Not by a foreign spy, a whistleblower or even a corrupt official, but by the former president himself. The former president had been storing top secret documents in the basement of his home in Palm Beach, Florida. </StoryText>
                {/* <StoryImageContainer alignment={"center"}>
                    <img style={ImageStyle} src="https://picsum.photos/1920/1080" alt="" />
                    <StoryImageText>Stock Photo from Lorem Picsum</StoryImageText>
                </StoryImageContainer> */}
                <StoryText>This seizure contained 11 sets of documents, including some marked as "top secret" (the highest confidentiality rating a document can get).[^1] In total the FBI seized almost 200,000 pages of document covering everything from the healthcare system to nuclear defense capabilities of the armed forces.[^2]</StoryText>
                <StoryText>And yet, the raid provided so much more information about the state of U.S politics beyond just the former president's poor filing system. An investigation by 'They Speak for Us' can reveal exactly how this event was covered by legacy outlets.</StoryText>
                <StoryContentHeading>Overview of the Dataset</StoryContentHeading>
                <StoryText>They Speak for Us collects the latest headlines from 30 outlets twice a day to build a picture of relevant topics or events in legacy media. This investigation will include any article published between the 1st of August 2022 and the 31st of December 2022. From there, a keyword search is performed to identify if an article mentions keywords relevant to the raid (Figure 1.1).
                    171,712 articles were collected during the investigation period, and 3.625% of these (6,255) were about the raid on Mar-A-Lago.
                </StoryText>
                <StoryGraphContainer>
                    {
                        accurateGraphData
                        ?<Graph title="Mar-A-Lago Coverage Over Time" data={graphData[0]}></Graph>
                        : <></>
                    }
                <StoryImageText>Figure 1.1</StoryImageText>
                </StoryGraphContainer>
                <StoryText>Analysis of graph and data presented above</StoryText>
                <StoryContentSubHeading>08/08/22</StoryContentSubHeading>
                <StoryText>
                The FBI raids the home of Former President Trump and seizes documents. The day after, 157 articles are published about the raid, representing the single highest amount of single-day exposure this story recieved.  The mean sentiment of these articles is -0.02.
                </StoryText>
                <StyledTable>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>79</td>
                            <td>Joe</td>
                            <td>Biden</td>
                            <td>85</td>
                        </tr>
                        <tr>
                            <td>79</td>
                            <td>Joe</td>
                            <td>Biden</td>
                            <td>85</td>
                        </tr>
                        <tr>
                            <td>79</td>
                            <td>Joe</td>
                            <td>Biden</td>
                            <td>85</td>
                        </tr>
                    </tbody>
                </StyledTable>
                <StoryContentHeading>Hell0</StoryContentHeading>
            </StoryContent>
        </>
    )
}

export default Story;