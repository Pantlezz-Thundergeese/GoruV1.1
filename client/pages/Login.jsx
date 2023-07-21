import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../styles/Login.scss';
import { UserIdContext } from '../contexts/Contexts.jsx';

const Login = (props) => {
  //create a state of invalid usernmae/passowrd initialixed to false
  const [user, setUser] = useState('');
  const [validLogin, setvalidLogin] = useState(false);
  const navigate = useNavigate();
  const { setGlobalId } = useContext(UserIdContext);

  const [info, setInfo] = useState({ username: '', password: '' });
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  //Check log in
  useEffect(() => {
    // check if the session is avaiable
    console.log('checking for active session');
    const checkSession = async () => {
      const res = await fetch('/api/user/checkSession', {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);
      if (data.authenticate) {
        setGlobalId(data.id);
        setvalidLogin(true);
      }
    };
    checkSession();
    setLoading(false);
  }, []);

  //Gitapi
  async function getUserData() {
    await fetch(`http://localhost:3000/getUserData`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('userData is', data);
        setUserData(data);
      });
  }

  // Redirect Github Login DONE
  function loginByGithub() {
    // ideally we fetch this client_id from the backend for safety reasons
    const CLIENT_ID = 'c238f56e0e5708918de2';

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
  }

  // Handle Github Login / Get Access_token
  useEffect(() => {
    const queryString = window.location.search;
    console.log('fronend queryString is', queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log('urlParams is', urlParams);
    const code = urlParams.get('code');
    console.log('code is', code);

    // code is from when user logs in from github probably
    if (code && !localStorage.getItem('accessToken')) {
      // async function for getting access token as a cookie
      async function getProfile() {
        const res = await fetch(
          `http://localhost:3000/api/oauth?code=${code}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await res.json();
        console.log('data from github');
        // userData = await res.json();
        // console.log('userData is ', userData);
        setUser(data);
      }

      getProfile();

      // valid login
      setvalidLogin(!validLogin);
    }
  }, []);

  // Handle Regular Login
  const handleClick = async (e) => {
    const res = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: info.username,
        password: info.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const id = await res.json();
    console.log('res is', id);
    if (typeof id === 'number') {
      setGlobalId(id);
      setvalidLogin(true);
    } else {
      alert('invalid username/password');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <div className="loginbackground">
        {!localStorage.getItem('accessToken') && !validLogin ? (
          <>
            <div className="formHeader">
              <h3>Welcome back!</h3>
              <h3>Log in with your name and password</h3>
            </div>
            <div className="container">
              <div className="login-form">
                <h2>Login</h2>
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="logininput"
                  name="username"
                  required
                  value={info.username}
                  onChange={(e) => {
                    setInfo({ ...info, username: e.target.value });
                  }}
                />
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="logininput"
                  name="password"
                  required
                  value={info.password}
                  onChange={(e) => {
                    setInfo({ ...info, password: e.target.value });
                  }}
                />
                <button id="allbuttons" type="submit" onClick={handleClick}>
                  Login
                </button>
              </div>
            </div>

            <div class="container">
              <a class="github-button" onClick={loginByGithub}>
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                  alt="GitHub logo"
                  class="github-logo"
                />
                <span>Login with GitHub</span>
              </a>
            </div>
          </>
        ) : (
          <>
            <h2>
              Successfully Logged In:{' '}
              <span style={{ color: 'orange' }}>{user.name}</span>
            </h2>
            <h3></h3>
            <button onClick={getUserData}>Get User Data</button>
            {Object.keys(userData).length !== 0 ? (
              <>
                <div className="text">
                  <h4>Hey there {userData.login}</h4>
                </div>

                <img className="user-image" src={userData.avatar_url} />
              </>
            ) : (
              <>
                <h4>No data available</h4>
              </>
            )}
          </>
        )}
      </div>
      <footer>
        <p>&copy; 2023 Goru. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
