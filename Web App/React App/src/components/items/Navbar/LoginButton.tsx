import QuietButton from "../inputs/QuietButton";


const LoginButton: React.FC<{}> = ({})=>{
    return (
        <a href="/login">
            <QuietButton label="Login"></QuietButton>
        </a>
    )
}

export default LoginButton;