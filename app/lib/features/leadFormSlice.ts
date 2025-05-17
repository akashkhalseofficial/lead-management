import {LeadFields} from "@/app/interface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: LeadFormState = {
  leadsData: [],
};

interface LeadFormState {
  leadsData: LeadFields[];
}

const leadFormSlice = createSlice({
  name: "leadform",
  initialState,
  reducers: {
    setLeadsFormData: (
      state: LeadFormState,
      action: {payload: LeadFields[]}
    ) => {
      state.leadsData = action.payload;
    },
  },
});

export const {setLeadsFormData} = leadFormSlice.actions;
export default leadFormSlice.reducer;
