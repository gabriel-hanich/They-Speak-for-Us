import styled from "styled-components"
import Statistic from "../items/Statistic"
import { OutletSelection, TopicVals } from "../../types"
import { useEffect, useState } from "react"
import Checklist from "../items/inputs/Checklist"

const Container = styled.div`
    height: 100%;
    width: 100%;
`

const DropDownContainer = styled.div`
    height: 20%;
    width: 100%;
`

const StatContainer = styled.div`
    margin-top: 5px;
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: row;
    @media (max-height: 1000px) {
        flex-wrap: wrap;
    }
    gap: 25px;
`

const StatisticBar: React.FC<{data: TopicVals[]}> = ({data})=>{
    const [articleCount, setArticleCount] = useState<number>(0);
    const [busiestDay, setBusiestDay] = useState<Date>();
    const [averageDailyOutput, setAverageDailyOutput] = useState<number>(0);
    const [topicSelectionList, setTopicSelectionList] = useState<OutletSelection[]>([]);
    const [color, setColor] = useState<string>("#fff");

    useEffect(()=>{
        // Find the total number of articles and the busiest day
        
        let topicNameList: string[] = data.map((topic: TopicVals)=> topic["title"]);

        let selectionList: OutletSelection[] = [{"name": "All Topics", "selected": true}]
        topicNameList.forEach((topicName: string)=>{
            selectionList.push({"name": topicName, "selected": false});
        });
        setTopicSelectionList(selectionList);
    }, [data]);

    useEffect(()=>{
        // Find the total number of articles and the busiest day
        let count: number = 0;
        let busiestDate: Date = new Date();
        let busietDayCount: number = 0;
        let selectedTopics: string[] = topicSelectionList.map((selection)=> selection["selected"] ? selection["name"] : "");
        data.forEach((topic: TopicVals)=>{
            if(selectedTopics.includes(topic["title"]) || selectedTopics.includes("All Topics")){
                if(!selectedTopics.includes("All Topics")){
                    setColor(topic["color"]);
                }else{
                    setColor("#fff");
                }
                topic.points.forEach((point)=>{
                    count += point["y"];
                    if(point["y"] > busietDayCount){
                        busiestDate = point["x"];
                        busietDayCount = point["y"];
                    }
                });
            }
        })

        if(data[0] !== undefined){
            let dateRange = data[0].points[data[0].points.length - 1]["x"].getTime() - data[0].points[0]["x"].getTime();
            let dayRangeCount = Math.ceil(dateRange / (1000 * 3600 * 24));
            setAverageDailyOutput(Math.round(count / dayRangeCount * 100) / 100);

        }
        setArticleCount(count);
        setBusiestDay(busiestDate);
    }, [topicSelectionList]);

    return (
        <Container>
            <DropDownContainer>
                <Checklist promptLabel="Topics" initValueList={topicSelectionList} setValueList={setTopicSelectionList}></Checklist>
            </DropDownContainer>
            <StatContainer>
                <Statistic label="Total Number of Articles" value={articleCount === 0 ? "" : articleCount.toLocaleString()} color={color}></Statistic>
                <Statistic label="Busiest Day" value={articleCount === 0 ? "" : (busiestDay as Date).toLocaleDateString("en-AU")} color={color}></Statistic>
                <Statistic label="Average Daily Output" value={articleCount === 0 ? "" : averageDailyOutput.toLocaleString()} color={color}></Statistic>
            </StatContainer>

        </Container>
    )
}

export default StatisticBar