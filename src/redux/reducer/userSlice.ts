import { instanceGetRequests, instancePostRequests } from "@/api/axiosAuth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
      data: <any>{
        email: 'thanhnh@gmail.com',
        totalPoint: 2488
      },
      loadDataStatus: loadStatus.None,
      loadCreateDataStatus: loadStatus.None,
      loadUpdateDataStatus: loadStatus.None,
      loadDeleteDataStatus: loadStatus.None,
    },
    reducers: {
      resetLoadDataStatus: (state, action) => {
        state.data = {};
        state.loadDataStatus = loadStatus.None;
      },
      resetCreateDataStatus: (state, action) => {
        state.loadCreateDataStatus = loadStatus.None;
      },
      resetUpdateDataStatus: (state, action) => {
        state.loadUpdateDataStatus = loadStatus.None;
      },
      resetDeleteDataStatus: (state, action) => {
        state.loadDeleteDataStatus = loadStatus.None;
      },
    },
});

const { reducer: userReducer } = userSlice;
export const {resetLoadDataStatus, resetCreateDataStatus, resetUpdateDataStatus, resetDeleteDataStatus} = userSlice.actions;
export default userReducer;