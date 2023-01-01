import { useState } from "react";
import styled from "styled-components";
import Swatch from "./Swatch";



const SelectorContainer = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    display: grid;
    place-items: center;
    z-index: 1;
`

const OptionsContainer = styled.div`
    height: fit-content;
    width: fit-content;
    display: grid;
    background: #1D2D45;
    padding: 15px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 15px;
    border-radius: 15px;
`


const ColorPicker: React.FC<{color: string, setColor: any}> = ({color, setColor})=>{
    const [showPicker, setShowPicker] = useState(false);

    const colorList: string[] = ["#81B29A", "#FFB703", "#219EBC", "#FF8600", "#E76F51", "#F72585", "#D90429", "#5A189A", "#023047", "#11151C"]


    const handleOptionClick = (color: string)=>{
        setColor(color);
        setShowPicker(!showPicker)
    }

    return (
        <>
            {showPicker? 
                <SelectorContainer>
                    <OptionsContainer>
                        {
                            colorList.map((swatchColor)=>(
                                <Swatch key={swatchColor} color={swatchColor} onClick={()=>handleOptionClick(swatchColor)}></Swatch>
                            ))
                        }
                    </OptionsContainer>
                </SelectorContainer>
                :
                <Swatch color={color} onClick={()=>setShowPicker(!showPicker)}></Swatch>
        }
        </>
    )
}

export default ColorPicker;