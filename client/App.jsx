import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
// import helperFunctions from './helper-functions.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Home from './pages/Home.jsx';
import Posts from './pages/Posts.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import { CreateUser } from './pages/CreateUser.jsx';
import './styles/app.scss';
import { UserIdContext } from './contexts/Contexts.jsx';

const App = () => {
  //create a High Level state for whether the user is logged in or not
  //make the loggedInStatus either false OR the User's ID/cookie from database as idenfier
  const [globalId, setGlobalId] = useState('');

  return (
    <UserIdContext.Provider value={{ globalId, setGlobalId }}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path = "/createuser"
            element ={<CreateUser/>}
          />
          <Route
            path="/comments/:id"
            element={<Posts />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
        
      </BrowserRouter>
    </UserIdContext.Provider>
  );
};

export default App;

// const mdTestString =
// 'Inside the **App** with *markdown*!\n' +
// '\n``` const test = [1,2,3];```\n[reddit](www.reddit.com)';

// return <div>{helperFunctions.md(mdTestString)}</div>;
