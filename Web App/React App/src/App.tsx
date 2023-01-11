import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import { useEffect, useState } from 'react';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Story from './pages/Story';

function App() {
  const [userKey, setUserKey] = useState("");
  const [isSignedIn, setSignIn] = useState(false);
  // Load user key
  useEffect(()=>{
    if(localStorage.getItem("userDetails") != null){
      setUserKey(JSON.parse(localStorage.getItem("userDetails") as string)["key"]);
      setSignIn(true);
    }
  }, [])

  useEffect(()=>{
    if(userKey !== ""){
      localStorage.setItem("userDetails", JSON.stringify({"key": userKey}));
    }
  }, [userKey])

  return (
    <Routes>
      <Route path='/' element={<Home isSignedIn={isSignedIn}></Home>}></Route>
      <Route path='/join' element={<CreateAccount setUserKey={setUserKey}></CreateAccount>}></Route>
      <Route path='/login' element={<Login setUserKey={setUserKey}></Login>}></Route>
      <Route path='/explore' element={<Explore userKey={userKey}></Explore>}></Route>
      <Route path='/stories/*' element={<Story isSignedIn={isSignedIn}></Story>}></Route>
    </Routes>
  );
}

export default App;
