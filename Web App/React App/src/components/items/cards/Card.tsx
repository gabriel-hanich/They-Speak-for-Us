import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 100%;
    max-width: 300px;
    aspect-ratio: 5/6;
    border-radius: 35px;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.35);

    display: grid;
    grid-template-rows: 1fr 3fr;

    background: radial-gradient(
        at 50% 50%,
        hsla(193, 95%, 65%, 1) 0px,
        transparent 100%
    ),
    radial-gradient(
        at 0% 0%,
        hsla(162, 100%, 56%, 1) 0px,
        transparent 100%
    ),
    radial-gradient(
        at 100% 0%,
        hsla(212, 94%, 28%, 1) 0px,
        transparent 50%
    ),
    radial-gradient(
        at 0% 100%,
        hsla(265, 71%, 35%, 1) 0px,
        transparent 50%
    ),
    radial-gradient(
        at 100% 100%,
        hsla(257, 100%, 75%, 1) 0px,
        transparent 50%
    )
    ;
`

const Title = styled.h1`
    margin: auto;
    margin-top: 15px;
    width: 85%;
    text-align: center;
    font-size: 2rem;
`

const Value = styled.h2`
    margin-top: 50px;
    width: 100%;
    text-align: center;
    font-size: 4.5rem;
`

const Card:React.FC<{title: string, value?: string, content?:string}> = ({title, value="", content=""})=>{
    return (
        <Container>
            <Title>{title}</Title>
            {
                value === ""
                ? <></>
                : <Value>{value}</Value>
            }
            {
                content === ""
                ? <></>
                : <h2>{content}</h2>
            }
        </Container>
    )
};

export default Card;