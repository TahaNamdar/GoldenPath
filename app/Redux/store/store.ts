import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../featrues/toggle/toggleSlice";
import chipReducer from "../featrues/chipSlice";
import editorReducer from "../featrues/editorSlice";
import activeAgeReducer from "../featrues/activeAge";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    chip: chipReducer,
    editor: editorReducer,
    activeAge: activeAgeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
