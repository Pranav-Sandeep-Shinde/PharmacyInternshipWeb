import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router'
import Navbar from './components/SideBar';
import { Analytics } from "@vercel/analytics/react"
const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDrugs, setSelectedDrugs] = useState([]); // ✅ Add selectedDrugs state

  useEffect(() => {
    const isAnimationDisplayed = sessionStorage.getItem("logoAnimationPlayed");

    if (isAnimationDisplayed === "true") {
      setIsVisible(true); // Show immediately if already played
      return;
    }

    // Delay only on the first session
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("logoAnimationPlayed", "true"); // Store flag
    }, 5000);

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, []);
  // Disabling the right click and key shortcut
  useEffect(() => {
    // Disable Right-Click
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Disable Common Keyboard Shortcuts
    const disableShortcuts = (event) => {
      if (
        event.ctrlKey &&
        ["u", "U", "c", "C", "i", "I", "s", "S"].includes(event.key)
      ) {
        event.preventDefault();
      }
      if (["F12", "F11", "F10"].includes(event.key)) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", disableShortcuts);

    // Detect DevTools Open (Close Immediately)
    let devToolsOpened = false; // Ensure it runs only once

    const detectDevTools = () => {
      if (!devToolsOpened) {
        const threshold = 160;
        if (
          window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold
        ) {
          devToolsOpened = true;
          alert("DevTools detected! The window will now close.");
          document.body.innerHTML = "h1>DevTools detected! The window will now close.</h1>";
        }
      }
      requestAnimationFrame(detectDevTools);
    };
    requestAnimationFrame(detectDevTools);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);


  return (
    <div className='min-h-screen bg-gray-100'>
      {isVisible && <Navbar />} {/* Show navbar after 5 sec delay */}
      <main className='pt-4 md:pt-0'>
        {/* ✅ Pass selectedDrugs and setSelectedDrugs via context */}
        <Outlet context={{ selectedDrugs, setSelectedDrugs }} />
      </main>
      <SpeedInsights />
      <Analytics />
    </div>

  );
};

export default App
