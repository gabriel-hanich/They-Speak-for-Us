import styled from "styled-components"
import NavBar from "../components/items/Navbar/Navbar"
import AccountWarning from "../components/Explore/AccountWarning"
import QueryGenerator from "../components/Explore/QueryGenerator"
import OutputGraph from "../components/Explore/OutputGraph"
import { OutletQuery, TopicVals } from "../types"
import { useEffect, useState } from "react"
import StatisticBar from "../components/Explore/StatisticBar"

const Content = styled.div`
    height: fit-content;
    width: 100vw;

    margin-top: 50px;
    margin-left: 10px;
    padding-bottom: 150px;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: top;
    justify-content: left;

    @media (max-height: 1000px) {
        margin: 0px;
        margin-top: 10px;
        height: 150vh;
    }
`

const LeftPane = styled.div`
    flex: 0.35;
    width: 100%;
    height: 100%;
    
    @media (max-height: 1000px) {
        flex: 0.35;
    }
`



const RightPane = styled.div`
    flex: 0.65;
    width: 100%;
    height: 100%;
    @media (max-height: 1000px) {
        flex: 0.65;
    }
`

const Explore: React.FC<{userKey: string}> = ({userKey})=>{
    const [query, setQuery] = useState<OutletQuery>();
    const [reloadCount, setReloadCount] = useState<number>(0);
    const [topicVals, setTopicVals] = useState<TopicVals[]>([]);
    
    useEffect(()=>{
        if(localStorage.getItem("graphData") != null){ // If existing graph data exists, read that 
            let loadedData = JSON.parse(localStorage.getItem("graphData") as string);
            let newData: OutletQuery = {
                "title": loadedData["title"],
                "startDate": new Date(loadedData["startDate"]),
                "endDate": new Date(loadedData["endDate"]),
                "topicList": loadedData["topicList"]
            }
            setQuery(newData);
            setReloadCount(1);
        }
    }, []);

    useEffect(()=>{
        if(query !== undefined){ // Save the new query on change
            let dataToLoad = {
                "title": query["title"],
                "startDate": query["startDate"],
                "endDate": query["endDate"],
                "topicList": query["topicList"]
            }
            localStorage.setItem("graphData", JSON.stringify(dataToLoad));
        }
    }, [query])

    return (
        <>
            {
                userKey === "" ? 
                <AccountWarning></AccountWarning>
                :
                <></>
            }
            <NavBar isSignedIn={userKey !== ""}></NavBar>
            <Content>
                <LeftPane>
                    <QueryGenerator query={query} setOutletQuery={setQuery} reloadCount={reloadCount} setReloadCount={setReloadCount} plotData={topicVals}></QueryGenerator>
                </LeftPane>          
                <RightPane>
                    <div style={{height: "60%", width: "95%", margin: "auto", "borderRadius": "35px", "overflow": "hidden"}} className="frosted">
                        <OutputGraph query={query} userKey={userKey} reloadCount={reloadCount} setDataVals={setTopicVals}></OutputGraph>
                    </div>
                    <div style={{height: "26.5%", width: "95%", margin: "auto", marginTop: "20px"}}>
                        <StatisticBar data={topicVals}></StatisticBar>
                    </div>
                </RightPane>          
            </Content>
        </>
    )
}

export default Explore