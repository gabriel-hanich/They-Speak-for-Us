import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 35px;

    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    gap: 0px;
`

const Label = styled.h1`
    width: 95%;
    text-align: center;
    font-size: 1.85rem;
    color: rgba(255, 255, 255, 0.45);
    `

const Value = styled.h1`
    width: 95%;
    text-align: center;
    font-size: 3.5rem;
    background: linear-gradient(to bottom, #67d6e7, #3a536d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`


const Statistic: React.FC<{label: string, value: number}> = ({label, value})=>{
    return (
        <Container className="frosted">
            <Label>{label}</Label>
            <Value>{value.toLocaleString()}</Value>
        </Container>
    )
}

export default Statistic;