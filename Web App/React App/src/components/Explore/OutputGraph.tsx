import styled from "styled-components";
import { OutletQuery, Topic, TopicVals } from "../../types";
import { useEffect, useState } from "react";
import Graph from "../items/Graph";
import LoadingWheel from "../items/LoadingWheel";

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 30px;
`

const OutputGraph: React.FC<{query: OutletQuery | undefined}> = ({query})=>{
    
    const [accurateData, setAccurateData] = useState<boolean>(false); // If the currently stored data is accurate (matches the current query)
    const [lastQuery, setLastQuery] = useState<OutletQuery>({title: "", startDate: new Date(), endDate: new Date(), "topicList": []}); // Stores the last query to compare against when it changes
    
    // Graph props
    const [title, setTitle] = useState<string>("");
    const [topicVals, setTopicVals] = useState<TopicVals[]>([]);

    useEffect(()=>{
        // Find if query changes require new data from the server or not
        let requiresNewData: boolean | null  = null; // Whether fresh data is required
        if(lastQuery.title === "" && query !== undefined){
            getNewData();
            console.log("CHED")
            setLastQuery(query as OutletQuery);
            return;
        }
        if(query !== undefined && JSON.stringify(query) !== JSON.stringify(lastQuery)){ 
            if(query["title"] !== lastQuery["title"]){
                if(requiresNewData == null){
                    requiresNewData = false;
                    console.log(1)
                }
            }else if(query["startDate"] !== lastQuery["startDate"] || query["endDate"] !== lastQuery["endDate"]){
                requiresNewData = true;
                console.log(2)
            }else if(query["topicList"] !== lastQuery["topicList"]){
                query["topicList"].forEach((topic: Topic, index: number)=>{
                    try{
                        if(topic["title"] !== lastQuery["topicList"][index]["title"] || topic["color"] !== lastQuery["topicList"][index]["color"]){
                            if(requiresNewData == null){
                                requiresNewData = false;
                                console.log(3)
                            }
                        }else if(topic["keywords"] !== lastQuery["topicList"][index]["keywords"] || topic["outletList"] !== lastQuery["topicList"][index]["outletList"]){
                            requiresNewData = true;
                            console.log(4)
                        }
                    }catch(TypeError){ // If the lengths don't match, a topic has been added or deleted and an update is needed
                        requiresNewData = true;
                        console.log(5)
                    }
                });
            }
            if(requiresNewData){
                getNewData();
            }else if(!requiresNewData){
                refreshDisplay();
            }
            setLastQuery(query);
        }
    }, [query])


    const getNewData = ()=>{
        let queryData = query;
        console.log("GETTING NEW DATA FROM THE CLOUD");
        setAccurateData(false);
        if(queryData !== undefined){
            const dateList: Date[] = getDatesBetween(queryData.startDate, queryData.endDate); 
            let newVals:TopicVals[] = [];
            queryData.topicList.forEach((topic: Topic)=>{
                let coords: {x: Date, y:number}[] = [];
                dateList.forEach((date: Date)=>{
                    coords.push({x: date, y: Math.random()});
                })

                newVals.push({
                    "id": topic.id,
                    "title": topic.title,
                    "color": topic.color,
                    "points": coords
                })
            })
            setAccurateData(true);
            setTopicVals(newVals);
            setTitle(queryData.title);
        }
    }

    const refreshDisplay = ()=>{
        console.log("REFRESH");
        if(query !== undefined){
            setAccurateData(false);
            setTitle(query.title);
            let newVals = topicVals;
            newVals.forEach((coord: TopicVals, index: number)=>{
                query.topicList.forEach((topic: Topic)=>{
                    if(topic["id"] === coord["id"]){
                        newVals[index]["title"] = topic["title"];
                        newVals[index]["color"] = topic["color"];
                        return
                    }
                })
                setTimeout(()=>{
                    setTopicVals(newVals);
                    setAccurateData(true);
                }, 200)
            });
        }
    }

    const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
        const dates: Date[] = [];
      
        let currentDate = new Date();
        currentDate.setFullYear(startDate.getFullYear());
        currentDate.setMonth(startDate.getMonth());
        currentDate.setDate(startDate.getDate());
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return dates;
    }

    return (
        <Container className="frosted">
            {
                accurateData ? 
                <Graph data={topicVals} title={title}></Graph>
                : <div style={{height: "100%", width: "100%", background: "rgb(42,42,42)", display: "grid", placeItems: "center"}}>
                    <div style={{height: "75px", width: "75px"}}>
                        <LoadingWheel></LoadingWheel>
                    </div>
                </div>
            }
        </Container>
    )
}
export default OutputGraph;