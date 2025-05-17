"use client";

import {RootState} from "../lib/store";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import "./index.css";
import AdminView from "./admin-view";

export default function LeadManagement() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (user.user.authenticated) {
    return (
      <div className="admin-view-container">
        <AdminView />
      </div>
    );
  } else {
    router.push("/login");
  }
}
