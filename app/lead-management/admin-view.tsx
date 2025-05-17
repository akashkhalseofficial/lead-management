"use client";

import "./admin-view.css";
import {useEffect, useState} from "react";
import LeadManagementLeads from "./leads/page";
import LeadManagementSettings from "./settings/page";
import almaLogo from "@/public/images/alma-logo.png";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../lib/store";
import {setUser} from "../lib/features/userSlice";
import {useRouter} from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AdminView() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("leads");
  const user = useSelector((state: RootState) => state.user);
  const [userEmail, setUserEmail] = useState("A");
  useEffect(() => {
    setUserEmail(user.user.email);
  }, [user]);

  return (
    <div className="admin-view">
      <div className={`side-nav-container ${isSideNavOpen ? "active" : ""}`}>
        <SideNav
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
        />
        <div className={`footer ${isSideNavOpen ? "active" : ""}`}>
          <div>
            <span>{userEmail.charAt(0).toUpperCase() || "A"}</span>
            <label>Admin</label>
          </div>
        </div>
      </div>
      <span
        className={`side-nav-toggle ${isSideNavOpen ? "active" : ""}`}
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        {isSideNavOpen ? (
          <ArrowBackIosIcon className="back-icon" />
        ) : (
          <ArrowForwardIosIcon className="forward-icon" />
        )}
      </span>
      <div className="content-container">
        <div className="admin-view-content">
          {currentPage === "leads" && <LeadManagementLeads />}
          {currentPage === "settings" && <LeadManagementSettings />}
        </div>
      </div>
    </div>
  );
}

function SideNav({
  setCurrentPage,
  currentPage,
  isSideNavOpen,
  setIsSideNavOpen,
}: {
  setCurrentPage: (page: string) => void;
  currentPage: string;
  isSideNavOpen: boolean;
  setIsSideNavOpen: (open: boolean) => void;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const logOut = async () => {
    dispatch(setUser({authenticated: false, email: ""}));
    const data = await fetch("/api/logout", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    });
    if (data.ok) {
      router.push("/login");
    }
  };
  return (
    <div className={`side-nav ${isSideNavOpen ? "active" : ""}`}>
      <Image src={almaLogo} alt="Alma Logo" className="logo" />
      <nav>
        <ul>
          <li
            onClick={() => {
              setCurrentPage("leads");
              setIsSideNavOpen(false);
            }}
            className={currentPage === "leads" ? "active" : ""}
          >
            Leads
          </li>
          <li
            onClick={() => {
              setCurrentPage("settings");
              setIsSideNavOpen(false);
            }}
            className={currentPage === "settings" ? "active" : ""}
          >
            Settings
          </li>
          <li onClick={() => logOut()}>Logout</li>
        </ul>
      </nav>
    </div>
  );
}
