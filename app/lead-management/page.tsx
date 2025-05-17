"use client";

import "./index.css";
import AdminView from "./admin-view";
import {useState} from "react";
import {useEffect} from "react";
import Login from "../login/page";

export default function LeadManagement() {
  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.token) {
        setUserAuthenticated(true);
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userAuthenticated) {
    return (
      <div className="admin-view-container">
        <AdminView />
      </div>
    );
  } else {
    return <Login />;
  }
}
