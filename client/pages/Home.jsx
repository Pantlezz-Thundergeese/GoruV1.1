import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../styles/Homes.scss';
import { HomeHeader } from '../components/HomeHeader.jsx';
import { HomeBody } from '../components/HomeBody.jsx';
import { SearchBar } from '../components/Searchbar.jsx';

const Home = () => {
  const [reloadBody, setReloadBody] = useState(false)

  return (
    <div className="homepage">
      <Navbar />
      <HomeHeader
      setReloadBody = {setReloadBody}
      reloadBody = {reloadBody}
       />
       <SearchBar/>
      <HomeBody
      setReloadBody = {setReloadBody}
      reloadBody = {reloadBody}
      />
    </div>
  );
};

export default Home;
