import { useEffect, useState } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { TopicVals } from "../../types";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export const Graph: React.FC<{data: TopicVals[], title: string}> = ({data, title})=>{
    
    const [plotData, setPlotData] = useState<any>();
    
    const options = {
        theme: "dark1",
        animaionEnabled: true,
        zoomEnabled: true,
        height: 500,
        title: {
            text: title,
            fontFamily: "Inter"
        },
        legend:{
            cursor: "pointer",
            fontSize: 16,
        },
        data: plotData
    };

    let chart: any = null;

    const setChart= (chartObj: any)=>{
        chart = chartObj;
    }
    
    useEffect(()=>{
        let newData: any[] = [];
        data.forEach((topic: TopicVals)=>{
            newData.push({
                type: "line",
                name: topic["title"],
                dataPoints: topic["points"],
                color: topic["color"]
            })
        });
        setPlotData(newData);
    }, [data]);


    return (
        <div>
            <CanvasJSChart options={options} onRef={(ref: any) => setChart(ref)}></CanvasJSChart>
        </div>
    )
};

export default Graph;