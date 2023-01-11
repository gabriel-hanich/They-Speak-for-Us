import styled from "styled-components"

export const StoryHeadingContainer = styled.div`
    height: 50vh;
    width: 40vw;
    min-width: 500px;
    background: transparent;
    border-radius: 50px 50px 0px 0px;
    border-top: 45px rgba(0, 0, 0, 1) solid;
    border-left: 60px rgba(0, 0, 0, 1) solid;
    border-right: 60px rgba(0, 0, 0, 1) solid;
    margin: auto;
    margin-bottom: 0;
    `

export const StorySubheading = styled.div`
    height: fit-content;
    width: 40vw;
    min-width: 500px;
    background: rgba(0, 0, 0, 1);
    margin: auto;
    margin-top: 0;
    padding: 20px 60px;
    border-radius: 0px 0px 50px 50px;
`

export const StoryContent = styled.div`
    height: fit-content;
    width: 60vw;
    min-width: 600px;
    max-width: 1500px;
    margin: auto;
    margin-top: 35px;
`

export const StoryContentHeading = styled.h1`
    font-size: 2rem;
    text-align: center;
`

export const StoryContentSubHeading = styled.h2`
    font-size: 1.75rem;
`

export const StoryText = styled.p`
    font-size: 1.5rem;
`

export const StoryImageContainer = styled.div<{alignment: string}>`
    background-color: rgba(0, 0, 0, 0.25);
    height: fit-content;
    width: fit-content;
    margin: ${props => props.alignment === "center" ? "auto" : "0"}; 
    padding: 50px 60px 100px 60px;
    border-radius: 50px;
    display: grid;
    place-items: ${props => props.alignment};
    align-text: ${props => props.alignment};
    margin-bottom: 35px;
`

export const StoryImageText = styled.p`
    font-size: 1.25rem;
    margin-left: 5px;
    flex-basis: 160px;
`

export const StoryGraphContainer = styled.div`
    height: "350px";
    background-color: rgba(0, 0, 0, 0.25);
    padding: 50px 60px 100px 60px;
    border-radius: 50px;
    width: "fit-content";
    margin-bottom: 35px;
`