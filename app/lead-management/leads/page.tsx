"use client";

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import TableGrid from "./table-grid";
import {getLeadsFromIndexedDB} from "@/app/indexDbService";
import {setLeadsFormData} from "@/app/lib/features/leadFormSlice";
import {useEffect} from "react";
import {LeadFields} from "@/app/interface";
import {RootState} from "@/app/lib/store";
export default function LeadManagementLeads() {
  const dispatch = useDispatch();
  const leadsData = useSelector((state: RootState) => state.leadform.leadsData);
  useEffect(() => {
    const fetchLeads = async () => {
      const leadsData = await getLeadsFromIndexedDB();
      dispatch(setLeadsFormData(leadsData as LeadFields[]));
    };
    fetchLeads();
  }, [dispatch]);

  return (
    <div className="leads-container">
      <h1>Leads</h1>
      <div className="leads-table">
        {leadsData.length > 0 ? (
          <>
            <TableGrid leadsData={leadsData} />
          </>
        ) : (
          <div className="no-leads-message">No leads found</div>
        )}
      </div>
    </div>
  );
}
