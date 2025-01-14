import React, { useState, useEffect, useContext } from 'react';
import { UserIdContext } from '../contexts/Contexts.jsx';
export function HomeHeader({ reloadBody, setReloadBody }) {
  //state for the form inputs
  const [apiName, setApiName] = useState('');
  const [apiURL, setApiURL] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const [apiImageURL, setApiImageURL] = useState('');
  const [typeApi, setTypeApi] = useState(false);
  const [typeFramework, setTypeFramework] = useState(false);
  const [typeLibrary, setTypeLibrary] = useState(false);

  const [username, setUsername] = useState('');
  const { globalId, setGlobalId } = useContext(UserIdContext);

  //check for name
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/user/id/${globalId}`);
        const data = await response.json();
        setUsername(data.user.name);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [username]);

  //to Show Overlay
  const [showOverlay, setShowOverlay] = useState(false);
  //To Open OverLay
  const openOverlay = () => {
    if (showOverlay === false) {
      setShowOverlay(true);
    }
    if (showOverlay === true) {
      setShowOverlay(false);
    }
  };

  //post data to backend
  const addAPI = async () => {
    console.log('addAPI inside');
    event.preventDefault();

    try {
      setShowOverlay(false);

      const response = await fetch('/api/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: apiName,
          link: apiURL,
          image: apiImageURL,
          typeApi: typeApi,
          typeFramework: typeFramework,
          typeLibrary: typeLibrary,
          description: apiDescription,
          keywords: ['maps'],
        }),
      });
      const data = await response.json();
      setReloadBody(true);
      console.log('success');
      console.log('data returned', data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-header">
      <div className="home-title-hero">
        <img src="./logo3.png" className="logo"></img>
        {typeof globalId === 'number' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2 style={{ color: 'black' }}>Welcome back, {username}</h2>
            <h3>Cohort: CTRI 17</h3>

            <button id="allbuttons" className="button" onClick={openOverlay}>
              + ADD TECH
            </button>
          </div>
        ) : (
          <div>
            <h1>Welcome to Goru</h1>
          </div>
        )}
        {showOverlay ? (
          <div className="newAddTech">
            <div className="formGroup">
              <div>
                <h2>Add Tech</h2>
                <button onClick={openOverlay}>X</button>
              </div>
              <input
                type="text"
                className="input-one"
                placeholder="Add API Name"
                value={apiName}
                onChange={(event) => {
                  setApiName(event.target.value);
                }}
              />
              <input
                type="text"
                className="input-one"
                placeholder="Add API URL"
                value={apiURL}
                onChange={(event) => {
                  setApiURL(event.target.value);
                }}
              />
              <textarea
                className="input-one"
                rows="3"
                maxLength="150"
                placeholder="Add Brief Description"
                value={apiDescription}
                onChange={(event) => {
                  setApiDescription(event.target.value);
                }}
              />
              <input
                type="text"
                className="input-one"
                placeholder="Add Image URL"
                value={apiImageURL}
                onChange={(event) => {
                  setApiImageURL(event.target.value);
                }}
              />
              <div className="checkList">
                <label>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setTypeApi(true);
                    }}
                  />
                  Api
                </label>
                <label>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setTypeFramework(true);
                    }}
                  />
                  Framework
                </label>
                <label>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setTypeLibrary(true);
                    }}
                  />
                  Library
                </label>
              </div>
              <input type="file" className="input-one" accept="image/*" />
              <button className="login-button" onClick={addAPI}>
                Submit!
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
