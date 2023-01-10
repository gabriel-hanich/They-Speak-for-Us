import styled from "styled-components";
import { OutletQuery, Point, Topic, TopicVals } from "../../types";
import { useEffect, useState } from "react";
import Graph from "../items/Graph";
import LoadingWheel from "../items/LoadingWheel";
import { GetDataPoints } from "../../services/getData";

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 30px;
`

const OutputGraph: React.FC<{query: OutletQuery | undefined, userKey: string, reloadCount: number, setDataVals: any}> = ({query, userKey, reloadCount, setDataVals})=>{
    
    const [accurateData, setAccurateData] = useState<boolean>(false); // If the currently stored data is accurate (matches the current query)
    const [lastQuery, setLastQuery] = useState<OutletQuery>({title: "", startDate: new Date(), endDate: new Date(), "topicList": []}); // Stores the last query to compare against when it changes
    const [hasInnited, setHasInnited] = useState<boolean>(false);
    // Graph props
    const [title, setTitle] = useState<string>("");
    const [topicVals, setTopicVals] = useState<TopicVals[]>([]);

    useEffect(()=>{
        // Find if query changes require new data from the server or not
        let requiresNewData: boolean | null  = null; // Whether fresh data is required
        if(lastQuery.title === "" && query !== undefined){
            getNewData();
            setLastQuery(query as OutletQuery);
            return;
        }
        if(query !== undefined && JSON.stringify(query) !== JSON.stringify(lastQuery)){ 
            if(query["title"] !== lastQuery["title"]){
                if(requiresNewData == null){
                    requiresNewData = false;
                }
            }else if(query["startDate"] !== lastQuery["startDate"] || query["endDate"] !== lastQuery["endDate"]){
                requiresNewData = true;
            }else if(query["topicList"].length !== lastQuery["topicList"].length){
                requiresNewData = true;
            }else if(query["topicList"] !== lastQuery["topicList"]){
                query["topicList"].forEach((topic: Topic, index: number)=>{
                    try{
                        if(topic["title"] !== lastQuery["topicList"][index]["title"] || topic["color"] !== lastQuery["topicList"][index]["color"]){
                            if(requiresNewData == null){
                                requiresNewData = false;
                            }
                        }else if(topic["keywords"] !== lastQuery["topicList"][index]["keywords"] || topic["outletList"] !== lastQuery["topicList"][index]["outletList"]){
                            requiresNewData = true;
                        }
                    }catch(TypeError){ // If the lengths don't match, a topic has been added or deleted and an update is needed
                        requiresNewData = true;
                    }
                });
            }
            if(requiresNewData){
                getNewData();
            }
            if(!requiresNewData){
                refreshDisplay();
            }
            setLastQuery(query);
        }
    }, [reloadCount])

    const getNewData = ()=>{
        console.log("GETTING");
        let queryData = query;
        setAccurateData(false);
        if(queryData !== undefined){
            GetDataPoints(queryData, userKey).then((res)=>{
                let newVals:TopicVals[] = [];

                queryData?.topicList.forEach((topic: Topic)=>{
                    let coords: Point[] = [];
                    res.forEach((val)=>{
                        if(val["name"] === topic["title"]){
                            coords = val["data"];
                        }
                    });
                    newVals.push({
                        "id": topic.id,
                        "title": topic.title,
                        "color": topic.color,
                        "points": coords
                    })
                });
                setAccurateData(true);
                setTopicVals(newVals);
                setDataVals(newVals);
                setTitle((queryData as OutletQuery).title);
            });
        }
    }

    const refreshDisplay = ()=>{
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


    return (
        <Container className="frosted">
            {
                accurateData ? 
                <Graph data={topicVals} title={title}></Graph>
                : <div style={{height: "100%", width: "100%", background: "#32373A", display: "grid", placeItems: "center"}}>
                    <div style={{height: "75px", width: "75px"}}>
                        <LoadingWheel></LoadingWheel>
                    </div>
                </div>
            }
        </Container>
    )
}
export default OutputGraph;