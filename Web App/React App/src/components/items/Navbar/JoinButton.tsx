import StyleButton from "../inputs/StyleButton";

const JoinButton: React.FC<{}> = ({})=>{
    return (
        <a href="/join">
            <StyleButton text="Join" onClick={()=> console.log("clicked")}></StyleButton>
        </a>
    )
}

export default JoinButton;