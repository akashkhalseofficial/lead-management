import {createSlice} from "@reduxjs/toolkit";

interface UserState {
  user: {
    email: string;
    authenticated: boolean;
  };
}

const initialState: UserState = {
  user: {
    email: "",
    authenticated: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: {payload: UserState["user"]}) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
