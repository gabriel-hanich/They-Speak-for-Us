import styled from "styled-components"
import QuietButton from "../items/inputs/QuietButton"
import { TopicVals } from "../../types"

const Container = styled.div`
    height: 100%;
    width: 100%;
`

const Downloader: React.FC<{plotData: TopicVals[]}> = ({plotData})=>{
    
    const generateCSVData = ()=>{
        let rowsList: any[] = [];
        plotData.forEach((topicVal, index)=>{
            if(index === 0){
                let dateList: any[] = ["Date"];
                topicVal["points"].forEach((point)=>{
                    dateList.push(point["x"].toISOString());
                })
                rowsList.push(dateList);
            }
            let rowData: any[] = [topicVal["title"]];
            topicVal["points"].forEach((point)=>{
                rowData.push(point["y"]);
            });
            rowsList.push(rowData);
        });
        let csvContent = "data:text/csv;charset=utf-8," + rowsList.map(e => e.join(",")).join("\n");
        let encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }

    return (
        <Container>
            <QuietButton label="Download " onClick={generateCSVData}></QuietButton>
        </Container>
    )
}
export default Downloader