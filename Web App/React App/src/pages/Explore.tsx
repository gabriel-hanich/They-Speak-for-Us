import styled from "styled-components"
import NavBar from "../components/items/Navbar/Navbar"
import AccountWarning from "../components/Explore/AccountWarning"
import QueryGenerator from "../components/Explore/QueryGenerator"
import OutputGraph from "../components/Explore/OutputGraph"
import { OutletQuery } from "../types"
import { useEffect, useState } from "react"

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
`

const LeftPane = styled.div`
    flex: 0.35;
    width: 100%;
    height: 80vh;
`



const RightPane = styled.div`
    flex: 0.65;
    width: 100%;
    height: 90vh;
`

const Explore: React.FC<{userKey: string}> = ({userKey})=>{
    const [query, setQuery] = useState<OutletQuery>();
    
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
                    <QueryGenerator query={query} setOutletQuery={setQuery}></QueryGenerator>
                </LeftPane>          
                <RightPane>
                    <div style={{height: "60%", width: "95%", margin: "auto"}}>
                        <OutputGraph query={query}></OutputGraph>
                    </div>
                </RightPane>          
            </Content>
        </>
    )
}

export default Explore