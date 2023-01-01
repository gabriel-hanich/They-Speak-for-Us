import { useEffect, useState } from "react";
import styled from "styled-components";
import StyleButton from "./StyleButton";
import QuietButton from "./QuietButton";
import { OutletSelection } from "../../../types";

const Container = styled.div`
    width: 100%;
    height: 40px;
    margin-top: 0px;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.15);
    transition: all 0.5s ease;
    cursor: pointer;
`

const PageDimmer = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    display: grid;
    place-items: center;
`

const FormContainer = styled.div`
    padding: 20px;
    height: fit-content;
    width: 30vw;
    min-width: 450px;
    background: #1D2D45;
`

const FormRow = styled.div`
    height: 45px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ButtonContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    gap: 5px;
`


const Checklist: React.FC<{promptLabel: string, initValueList: OutletSelection[], setValueList: any}> = ({promptLabel, setValueList, initValueList=[]})=>{
    const formLabel = {fontSize: "1.35rem", width: "100%", marginTop: "15px", marginLeft: "10px", color: "rgba(255, 255, 255, 0.85)"};
    const formInput = {marginRight: "0px", height: "85%", background: "rgba(0, 0, 0, 0.35)", cursor: "pointer", flex: "0.7"}
    
    const [label, setLabel] = useState(promptLabel);
    const [expanded, setExpanded] = useState(false);
    const [checkedList, setCheckedList] = useState<OutletSelection[]>(initValueList);
    
    useEffect(()=>{
        setCheckedList(initValueList);
    }, [initValueList]);

    const resetValues = ()=>{
        let a: OutletSelection[] = checkedList.map((value)=>
            value = {"name": value['name'], "selected": false}
        )
        setCheckedList(a);
        setValueList(a);
        
        // Render the change in all the boxes
        let boxes = document.getElementsByClassName("checkListBox");
        for(var i=0; i<boxes.length; i++){
            (boxes[i] as HTMLInputElement).checked = false;
        }
    }

    const updateValue = (newValue: OutletSelection)=>{
        let a = checkedList.map((value)=>
            value["name"] === newValue["name"]
            ? newValue
            : value
        )
        setCheckedList(a);
        setValueList(a);
    } 

    const submit =()=>{
        setExpanded(!expanded);
    }
    

    useEffect(()=>{
        // Update the Label to show how many outlets have been selected
        let selectedCount = 0;
        let result = ""
        // Create result based off selected outlets
        checkedList.forEach((item)=>{
            if(item["selected"]){
                selectedCount += 1;
                if(result === ""){ 
                    result += item.name
                }else{ // Only append comma if not the first element
                    result += ", " + item.name
                }
            }
        })
        if(selectedCount === 0){
            setLabel(promptLabel); // Show filler text if nothing is submitted
        }
        else if(result.length > 28){ // Show different filler text if too much is submitted
            setLabel(`${selectedCount} Outlets`)
        }else{
            setLabel(result);
        }
    }, [checkedList])

    return (
        <>
            <Container onClick={submit}>
                <p style={{...formLabel, marginTop: "6px"}}>{label}</p>
            </Container>
            {
                expanded 
                ?
                <PageDimmer>
                    <FormContainer>
                        <h2>{promptLabel}</h2>
                        {
                            initValueList.map((item, index)=>(
                                <FormRow key={index}>
                                    <p style={{...formLabel, flex: "0.3"}}>{item["name"]}</p>
                                    <input
                                        type="checkbox"
                                        className="checkListBox"
                                        style={formInput}
                                        key={index}
                                        defaultChecked={checkedList[index]["selected"]}
                                        onChange={(event)=> updateValue({"name": item["name"], "selected": event.target.checked})}/>
                                </FormRow>
                            ))
                        }
                        <ButtonContainer>
                            <div style={{width: "20%", height: "55px"}}>
                                <QuietButton label={"Reset"} onClick={resetValues}></QuietButton>
                            </div>
                            <div style={{width: "20%", height: "55px"}}>
                                <StyleButton text={"Go"} onClick={submit}></StyleButton>
                            </div>
                        </ButtonContainer>
                    </FormContainer>
                </PageDimmer>
                :
                <></>
            }
        </>
    )
}

export default Checklist;