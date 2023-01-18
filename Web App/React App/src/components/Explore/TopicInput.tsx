import { useEffect, useState } from "react";
import styled from "styled-components";
import Field from "../items/inputs/Field";
import ColorPicker from "./ColorPicker/ColorPicker";
import { OutletSelection, Topic } from "../../types";
import Checklist from "../items/inputs/Checklist";
import { FaCaretDown } from 'react-icons/fa';


const Container = styled.div<{isActive: boolean}>`
    height: fit-content;
    max-height: ${props => props.isActive ? '250px' : '60px'};
    overflow: hidden;
    width: 100%;
    background: rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;
    margin-bottom: 10px;
`

const FormContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 30% 65%;
`


const TopicInput: React.FC<{startingVals: Topic, number: number, onTopicChange: any}> = ({startingVals, number, onTopicChange})=>{
    const formLabel = {fontSize: "1.35rem", width: "100%", marginTop: "15px", marginLeft: "10px", color: "rgba(255, 255, 255, 0.85)"};
    const formInput = {height: "35px", width: "100%", marginTop: "15px"};

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [topicName, setTopicName] = useState<string>(startingVals["title"]);
    const [keywords, setKeywords] = useState<string[]>(startingVals["keywords"]);
    const [color, setColor] = useState<string>(startingVals["color"]);
    const [outletList, setOutletList] = useState<OutletSelection[]>(startingVals["outletList"]);
    
    useEffect(()=>{
        setTopicName(startingVals["title"]);
        setKeywords(startingVals["keywords"]);
        setColor(startingVals["color"]);
        setOutletList(startingVals["outletList"]);
    }, [startingVals]);

    useEffect(()=>{
        let returnData: Topic = {
            "id": startingVals["id"],
            "title": topicName,
            "color": color,
            "keywords": keywords,
            "outletList": outletList,
        }
        onTopicChange(returnData);
    }, [topicName, keywords, color, outletList]);

    const updateKeywords = (val: string)=>{
        setKeywords(val.split(","))
    }

    return (
        <Container isActive={isExpanded}>
            <Container isActive={isExpanded} style={{textAlign: "left", display: "grid", gridTemplateColumns: "10% 70% 40%", height: "60px"}}>
                <FaCaretDown style={{height: "50%", width: "auto", cursor: "pointer", marginTop: "10px"}} onClick={()=>setIsExpanded(!isExpanded)}></FaCaretDown>
                <h1 style={{marginTop: "10px"}}>{topicName === "" ? "Topic" : topicName}</h1>
                <div style={{marginTop: "5px"}}>
                    <ColorPicker setColor={setColor} color={color}></ColorPicker>
                </div>
            </Container>
            <FormContainer>
                <p style={formLabel}>Name</p>
                <div style={formInput}>
                    <Field setVal={setTopicName} id={"titleInput" + number} onSubmit={()=>console.log("submit")} initValue={topicName}></Field>
                </div>
                <p style={formLabel}>Keywords</p>
                <div style={formInput}>
                    <Field setVal={updateKeywords} id={"keywordInput" + number} onSubmit={()=>console.log("submit")} initValue={keywords}></Field>
                </div>
                <p style={formLabel}>Outlets</p>
                <div style={{...formInput, marginTop: "10px"}}>
                    <Checklist 
                        promptLabel={"Outlets to be included"}
                        initValueList={outletList}
                        setValueList={setOutletList}
                        ></Checklist>
                </div>
            </FormContainer>
        </Container>
    )
};


export default TopicInput;