import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import { useEffect, useState } from 'react';
import Explore from './pages/Explore';

function App() {
  const [userKey, setUserKey] = useState("");
  const [isSignedIn, setSignIn] = useState(false);
  // Load user key
  useEffect(()=>{
    if(localStorage.getItem("userDetails") != null){
      console.log("Loading Data")
      setUserKey(JSON.parse(localStorage.getItem("userDetails") as string)["key"]);
      setSignIn(true);
    }
  }, [])

  useEffect(()=>{
    console.log("Saving");
    if(userKey !== ""){
      localStorage.setItem("userDetails", JSON.stringify({"key": userKey}));
    }
  }, [userKey])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home isSignedIn={isSignedIn}></Home>}></Route>
        <Route path='/join' element={<CreateAccount setUserKey={setUserKey}></CreateAccount>}></Route>
        <Route path='/explore' element={<Explore userKey={userKey}></Explore>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
