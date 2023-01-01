import styled from "styled-components";

const Container = styled.div`
    height: 50px;
    aspect-ratio: 1/1;
    widht: auto;
    background: ${props => props.color };
    display: grid;
    place-items: center;
    border-radius: 5px;
`
const Content = styled.div`
    height: 40px;
    border-radius: 5px;
    aspect-ratio: 1/1;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
`


const Swatch: React.FC<{color: string, onClick: any}> = ({color, onClick})=>{

    return (
        <Container color={color}>
            <Content onClick={onClick}></Content>
        </Container>
    )
}
export default Swatch;