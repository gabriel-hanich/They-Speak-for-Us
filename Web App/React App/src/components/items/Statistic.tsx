import styled from "styled-components"

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 35px;
    text-align: center;
    display: grid;
    grid-template-rows: 1fr 1.1fr;
    justify-content: center;
    @media (max-height: 1000px) {
        max-height: 120px;
    }
`

const Labeltext = styled.h2`
    font-size: 1.85rem;
    width: 95%;
    height: 100%;
    margin: 0px;
    color: #fff;
    filter: opacity(0.35);
    @media (max-height: 1000px) {
        font-size: 1.25rem;
    }
`

const ValueText = styled.h1`
    height: 100%;
    width: 100%;
    font-size: 4.5rem;
    margin: 0;
    color: ${props => props.color};
    filter: opacity(1);
    @media (max-height: 1000px) {
        font-size: 3rem;
    }
   
`

const Statistic: React.FC<{label: string, value: string, color?: string}> = ({label, value, color="#fff"})=>{
    return (
        <Container className="frosted">
            <Labeltext color={color}>{label}</Labeltext>
            <ValueText color={color}>{value}</ValueText>
        </Container>
    )
}

export default Statistic