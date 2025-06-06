import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { LeadFields } from "@/app/interface";
import { updateItemByKey } from "@/app/indexDbService";
function TableGrid({ leadsData }: { leadsData: LeadFields[] }) {
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 230 },
    {
      field: "linkedInProfile",
      headerName: "LinkedIn Profile",
      flex: 1,
      minWidth: 230,
    },
    {
      field: "visasOfInterest",
      headerName: "Visas of Interest",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "resume",
      headerName: "Resume",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "additionalInfo",
      headerName: "Additional Info",
      flex: 1,
      minWidth: 200,
    },
  ];
  const [status, setStatus] = useState<string>("pending");
  const [filteredLeads, setFilteredLeads] = useState<LeadFields[]>([]);

  useEffect(() => {
    const filteredLeads = leadsData.filter((lead) => lead.status === status);
    setFilteredLeads(filteredLeads);
  }, [leadsData, status]);

  const handleProcessRowUpdate = (
    updatedRow: LeadFields,
    oldRow: LeadFields
  ) => {
    console.log(updatedRow, oldRow);
    const key = (updatedRow.id as number) + 1;
    updateItemByKey(key, updatedRow);
    return updatedRow;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowEditStop = (params: any) => {
    console.log("handleRowEditStop", params);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = filteredLeads.map((row: any, index: number) => ({
    id: index,
    visasOfInterest: row.visasOfInterest.join(", "),
    resume: row.resume && row.resume.length > 0 ? row.resume?.[0]?.name : "",
    ...row,
  }));
  return (
    <Paper
      className="paper"
      sx={{ height: "auto", width: "100%", overflowX: "auto" }}
    >
      <div className="status-select">
        <select
          name="status"
          id="status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">PENDING</option>
          <option value="reached_out">REACHED_OUT</option>
        </select>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        processRowUpdate={handleProcessRowUpdate}
        onRowEditStop={handleRowEditStop}
        className="data-grid"
        showToolbar
      />
    </Paper>
  );
}

export default TableGrid;
