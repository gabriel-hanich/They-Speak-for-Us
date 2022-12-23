import styled from "styled-components"

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas: 
        "img img heading heading"
        "img img byline byline"
        "img img desc desc";
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 15px;
`

const ImgContainer = styled.div`
    grid-area: img;
    height: 100%;
    width: 100%;
`

const ByLineContainer = styled.div`
    height: fit-content;
    width: fit-content;
    padding: 5px;
    border-radius: 15px;

    margin-left: 15px;

    display: flex;
    gap: 15px;
    background: rgba(0, 0, 0, 0.15);
`

const StoryThumbnail: React.FC<{imgUrl: string, title: string, date: Date, description: string, link: string, author: string}> = ({imgUrl, title, date, description, link, author})=>{
    return (
        <Container className="frosted">
            <ImgContainer>
                <a href={link}>
                    <img src={imgUrl} alt="" style={{height: "100%", width: "100%", objectFit: "cover"}}/>
                </a>
            </ImgContainer>
            <div style={{height: "100%", width: "100%", gridArea: "heading", marginLeft: "15px"}}>
                <h1>{title}</h1>
            </div>
            <ByLineContainer>
                <h3>{author}</h3>
                <h3>-</h3>
                <h3>{date.toLocaleDateString()}</h3>
            </ByLineContainer>
            <div style={{height: "100%", width: "100%", gridArea: "desc", marginLeft: "15px", marginTop: "5px"}}>
                <p style={{fontSize: "1.35"}}>{description}</p>
            </div>

        </Container>
    )
}

export default StoryThumbnail