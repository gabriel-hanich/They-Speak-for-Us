import { useState } from "react"
import styled from "styled-components"


const Container = styled.div`
    width: 100%;
    height: 100%;
`

const TextInput = styled.input`
    width: 100%;
    height: 80%;
    border: none;
    background: rgba(0, 0, 0, 0.55);

    font-size: 2.25rem;
    
    transition: background 0.5s ease;
    transition: border-radius 0.5s ease;
    color: #1D9BF0;
    margin-bottom: 0px;
    
    ::placeholder { 
        opacity: 0.55;
        font-size: 2rem; 
    }
    &:focus{
        background: rgba(0, 0, 0, 0.15);
        border-radius: 50px;
    }
`

const AutoFill = styled.div`
    height: fit-content;
    border: 0.1px black solid;
    height: fit-content;
    width: 100%;
    background: rgba(0, 0, 0, 0.45);
    margin-top: 0px;
    overflow: hidden;
    transition: all 0.5s ease;
    `

const Suggestion = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    y-overflow: hidden;
`

const SearchBar: React.FC<{}> = ()=>{
    const [suggestionList, setSuggestionList] = useState(["CNN", "Ukraine", "ABC News"]);
    const [showAutoFill, setShowAutoFill] = useState(false);

    const toggleAutoFill = ()=>{
        setShowAutoFill(prevShow => !prevShow);
    }

    const fillAutoComplete = (val: string)=>{
        (document.getElementById("searchBox") as HTMLInputElement).value = val;
    }

    const submitForm = (userName: string)=>{
        window.location.href = "/explore/?query=" + userName;

    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === "Enter"){
            submitForm((event.target as HTMLInputElement).value);
        }
    }

    return (
        <Container>
            <TextInput placeholder="Topic, Outlet or Story" id="searchBox" onFocus={toggleAutoFill} onBlur={toggleAutoFill} onKeyUp={(event)=> handleKeyPress(event)}></TextInput>
            <AutoFill id="autoFillContainer" style={{maxHeight: (showAutoFill ? suggestionList.length * 100 + 15: "0px")}}>
                {suggestionList.map((suggestion)=>{
                    return (
                        <Suggestion onClick={() => submitForm(suggestion)} key={suggestion}>
                            <h2 style={{opacity: 0.65, fontSize: "1.5rem"}}>{suggestion}</h2>
                        </Suggestion>
                    )
                })}
            </AutoFill>
        </Container>
    )
}


export default SearchBar