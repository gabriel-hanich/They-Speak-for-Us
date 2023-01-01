
export function GetOutletList(){
    return ["CNN", "Fox News", "ABC News", "The Guardian"]
}

export function VerifyEmail(email: string){ // Verify that a given email is valid
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}