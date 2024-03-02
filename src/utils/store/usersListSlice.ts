import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserItem, getUsers } from "../queries/getUsers";
import { RESULTS_PER_PAGE } from "../mock";

interface UsersListState {
  users: UserItem[][]; // Each array represents separate page
  loadingMore: boolean;
  currentPage: number;
  canBeLoadedMore: boolean;
}
const initialState: UsersListState = {
  users: [],
  loadingMore: false,
  currentPage: 1,
  canBeLoadedMore: true,
};

export const loadMoreUsers = createAsyncThunk(
  "usersList/loadMoreUsers",
  async ({ nextPage }: { nextPage: number }) => {
    const newUsers = await getUsers({
      searchParams: { page: nextPage + "", results: RESULTS_PER_PAGE + "" },
    });
    return newUsers;
  }
);

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserItem[]>) => {
      state.users = [action.payload] || [];
    },
    resetState: (state) => {
      state.users = [];
      state.canBeLoadedMore = true;
      state.loadingMore = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMoreUsers.pending, (state) => {
      state.loadingMore = true;
      state.currentPage++;
    });
    builder.addCase(loadMoreUsers.fulfilled, (state, action) => {
      if (!action.payload.length) {
        state.canBeLoadedMore = false;
      }
      state.users = [...state.users, [...action.payload]];
      state.loadingMore = false;
    });
  },
});

export const { setUsers, resetState } = usersListSlice.actions;

export default usersListSlice.reducer;