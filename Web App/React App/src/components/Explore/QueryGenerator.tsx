import styled from "styled-components"
import Field from "../items/inputs/Field"
import { useEffect, useState } from "react";
import TopicInput from "./TopicInput";
import { OutletQuery, OutletSelection, Topic, TopicVals } from "../../types";
import { getDefaultOutletSelection } from "../../services/constants";
import { FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import StyleButton from "../items/inputs/StyleButton";
import QuietButton from "../items/inputs/QuietButton";
import Downloader from "./Downloader";

const FormContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 30% 65%;

`

const ErrorContainer = styled.div`
    width: 80%;
    margin: auto;
    margin-bottom: 10px;
    border: 2px rgba(255, 0, 0, 0.65) solid;
    background: rgba(255, 0, 0, 0.35);
    padding: 2px;
    border-radius: 10px;
    text-align: center;
`


const TopicContainer= styled.div`
    width: 95%;
    margin: auto;
    height: fit-content;
`

const TopicAdder = styled.div`
    width: 95%;
    height: 50px;
    margin: auto;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
`

const QueryGenerator: React.FC<{query: OutletQuery | undefined, setOutletQuery: any, reloadCount: number, setReloadCount: any, plotData: TopicVals[]}> = ({query, setOutletQuery: setQuery, reloadCount, setReloadCount, plotData})=>{
    const formLabel = {fontSize: "1.5rem", width: "100%", marginTop: "15px", marginLeft: "10px", color: "rgba(255, 255, 255, 0.55)"};
    const formInput = {height: "35px", width: "100%", marginTop: "15px"};

    const [chartTitle, setChartTitle] = useState("");
    const [hasLoadedData, setHasLoadedData] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [topicList, setTopicList] = useState<Topic[]>([{"id": new Date().getTime().toString(),"title": "New Topic", "color": "#D90429", "keywords": [], "outletList": []}]);
    const [defaultOutlets, setDefaultOutlets] = useState<OutletSelection[]>()

    useEffect(()=>{
        if(query !== undefined && !hasLoadedData){ // Ensure new values are set only once and that the variable has been inited
            setChartTitle(query["title"]);
            setStartDate(query["startDate"]);
            setEndDate(query["endDate"]);
            setTopicList(query["topicList"]);
            setHasLoadedData(true);
        }
    }, [query])
    
    useEffect(()=>{
        let newQuery: OutletQuery = {
            "title": chartTitle,
            "startDate": startDate,
            "endDate": endDate,
            "topicList": topicList
        }
        setQuery(newQuery); // Send new query up the chain
    }, [chartTitle, startDate, endDate, topicList])


    const updateTopicList = (newTopic: Topic)=>{
        // Update a single topic stored in state
        setTopicList(
            topicList.map(topic =>
                topic.id === newTopic.id 
                ? newTopic
                : topic
            )
        ) 
    }

    useEffect(()=>{
        setHasLoadedData(false);
        getDefaultOutletSelection().then((res)=>{
            setDefaultOutlets(res);
            setHasLoadedData(true);
        })
    }, []);

    const addNewTopic = ()=>{
        setTopicList([...topicList, {
            "id": new Date().getTime().toString(),
            "title": "Topic " + (topicList.length + 1), 
            "color": "#D90429", 
            "keywords": [], 
            "outletList": (defaultOutlets as OutletSelection[])}])
    }

    const deleteTopic = ()=>{
        setTopicList(topicList.slice(0, -1));
    }

    const downloadData = ()=>{
        // If the user clicks on the 'setup' text, Allow them to download the point values of the graph
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plotData));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        (dlAnchorElem as HTMLElement).setAttribute("href",     dataStr     );
        (dlAnchorElem as HTMLElement).setAttribute("download", "plot.json");
        (dlAnchorElem as HTMLElement).click();
    }

    return (
        <div className="frosted" style={{height: "100%", width: "100%", borderRadius: "30px", margin: "0", overflowY: "scroll"}}>
            <h1 style={{width: "100%", textAlign: "center", margin: "0", fontSize: "2.5rem", cursor: "pointer"}} onClick={downloadData}>Setup</h1>
            {
                hasLoadedData ? 
                <>
                    <TopicAdder style={{"marginTop": "30px"}}>
                        <div style={{height: "80%", width: "30%", minWidth: "280px"}}>
                            <QuietButton label="Reload Chart" onClick={()=> setReloadCount(reloadCount+1)}></QuietButton>
                        </div>
                        <div style={{height: "80%", width: "30%", minWidth: "280px"}}>
                            <Downloader plotData={plotData}></Downloader>
                        </div>
                    </TopicAdder>
                    <FormContainer>
                        <p style={formLabel}>Chart Title</p>
                        <div style={formInput}>
                            <Field setVal={setChartTitle} id="titleInput" onSubmit={()=>console.log("submit")} initValue={chartTitle}></Field>
                        </div>
                        <p style={formLabel}>Start Date</p>
                        <div style={formInput}>
                            <Field setVal={setStartDate} id="startDateInput" onSubmit={()=>console.log("submit")} type={"date"} initValue={startDate}></Field> 
                        </div>
                        <p style={formLabel}>End Date</p>
                        <div style={formInput}>
                            <Field setVal={setEndDate} id="endDateInput" onSubmit={()=>console.log("submit")} type={"date"} initValue={endDate}></Field> 
                        </div>
                    </FormContainer>
                    
                    {
                        (startDate.getTime() > endDate.getTime()) ?
                            <ErrorContainer>
                                <p>The End Date must be AFTER the Start Date</p>  
                                {/* Only show warning if the start date is after the end date */}
                            </ErrorContainer>
                        :
                            <></>

                    }

                </>
            :
                <></>
            }
            <TopicAdder>
                <FaTrash style={{height: "60%", width: "auto", cursor: "pointer"}} onClick={deleteTopic}></FaTrash>
                <FaPlus style={{height: "60%", width: "auto", cursor: "pointer"}} onClick={addNewTopic}></FaPlus>
            </TopicAdder>
            <TopicContainer>
                {
                    topicList.map((topic, index)=>(
                        <TopicInput startingVals={topic} number={index} onTopicChange={updateTopicList} key={index}></TopicInput>
                    ))
                }
            </TopicContainer>
            <a id="downloadAnchorElem"></a>
        </div>
    )
}

export default QueryGenerator