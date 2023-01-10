import { useEffect, useState } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { TopicVals } from "../../types";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export const Graph: React.FC<{data: TopicVals[], title: string}> = ({data, title})=>{
    
    const [plotData, setPlotData] = useState<any>();
    
    const options = {
        theme: "dark2",
        animationEnabled: true,
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
                showInLegend: true, 
                name: topic["title"],
                dataPoints: topic["points"],
                color: topic["color"]
            })
        });
        setPlotData(newData);
    }, [data]);


    return (
        <div style={{"background": "#32373A", height: "100%", width: "100%"}}>
            <CanvasJSChart options={options} onRef={(ref: any) => setChart(ref)}></CanvasJSChart>
        </div>
    )
};

export default Graph;