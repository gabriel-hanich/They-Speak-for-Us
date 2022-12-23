import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 100%;
    border: 5px grey solid;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    animation: spinWheel 3s ease infinite;

`

const InnerContainer = styled.div`
    height: 50%;
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    background: grey;
`


const LoadingWheel: React.FC<{}> = ({})=>{
    return (
        <Container>
            <InnerContainer></InnerContainer>
        </Container>

    )
}

export default LoadingWheel;