import styled from "styled-components"
import Field from "../items/inputs/Field"
import { useEffect, useState } from "react";
import TopicInput from "./TopicInput";
import { OutletQuery, Topic } from "../../types";
import { getDefaultOutletSelection } from "../../services/constants";
import { FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

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

const QueryGenerator: React.FC<{query: OutletQuery | undefined, setOutletQuery: any}> = ({query, setOutletQuery: setQuery})=>{
    const formLabel = {fontSize: "1.5rem", width: "100%", marginTop: "15px", marginLeft: "10px", color: "rgba(255, 255, 255, 0.55)"};
    const formInput = {height: "35px", width: "100%", marginTop: "15px"};

    const [chartTitle, setChartTitle] = useState("");
    const [hasLoadedData, setHasLoadedData] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [topicList, setTopicList] = useState<Topic[]>([{"id": new Date().getTime().toString(),"title": "New Topic", "color": "#D90429", "keywords": [], "outletList": getDefaultOutletSelection()}]);

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

    const addNewTopic = ()=>{
        setTopicList([...topicList, {
            "id": new Date().getTime().toString(),
            "title": "New Topic", 
            "color": "#D90429", 
            "keywords": [], 
            "outletList": getDefaultOutletSelection()}])
    }

    const deleteTopic = ()=>{
        setTopicList(topicList.slice(0, -1));
    }

    return (
        <div className="frosted" style={{height: "100%", width: "100%", borderRadius: "30px", margin: "0", overflowY: "scroll"}}>
            <h1 style={{width: "100%", textAlign: "center", margin: "0", fontSize: "2.5rem"}}>Setup</h1>
            {
                hasLoadedData ? 
                <>
                    <FormContainer style={{marginTop: "30px"}}>
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
        </div>
    )
}

export default QueryGenerator