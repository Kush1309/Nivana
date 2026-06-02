// src/components/GlobalLayout.jsx
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function GlobalLayout() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prevent loader on initial mount
    if (prevPath.current === location.pathname) {
      prevPath.current = location.pathname;
      return;
    }

    // Show loader for 2 seconds on every navigation
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);

    prevPath.current = location.pathname;
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading ? (
        // show the styled-components loader you provided
        <Loader />
      ) : (
        // actual pages render here
        <Outlet />
      )}
    </>
  );
}
