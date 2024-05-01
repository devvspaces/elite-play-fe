import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import AccountSettingsSection from '../components/AccountSettingsSection'
import Footer from '../components/Footer'
import { isLoggedIn } from '../utils/auth';
import './AccountSettings.css'

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
      function updateSize() {
          setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const AccountSettings = () => {
  const [width, height] = useWindowSize();
  const [chatOpen, setChatOpen] = useState(width > 768);
    const [isNavOpen, setIsNavOpen] = useState(true)
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const userIsLoggedIn = isLoggedIn();

    if (!userIsLoggedIn) {
      window.location.href='/'
    }
  
    const fetchUserProfile = async (accessToken) => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://be.eliteplay.bloombyte.dev/user/me',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
  
        console.error('Error fetching user profile:', error.message);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        fetchUserProfile(accessToken);
      } else {
        setLoading(false);
      }
    }, []);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} user={userProfile} chatOpen={chatOpen} setChatOpen={setChatOpen} setIsNavOpen={setIsNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} user={userProfile} />
      <AccountSettingsSection isNavOpen={isNavOpen} user={userProfile} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  )
}

export default AccountSettings