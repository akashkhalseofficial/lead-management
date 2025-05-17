import {configureStore} from "@reduxjs/toolkit";
import leadFormReducer from "./features/leadFormSlice";
import userReducer from "./features/userSlice";
export const store = configureStore({
  reducer: {
    leadform: leadFormReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["leadform/setLeadsFormData"],
        ignoredPaths: ["leadform.leadsData"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
