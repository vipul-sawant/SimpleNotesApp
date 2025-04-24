// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
// import authReducer from "./slices/authSlice.js";
// import noteReducer from "./slices/notesSlice.js";

// const persistConfig = {
//     key: "root",
//     storage,
//     blacklist: ["auth", "notes"]
// };

// const rootReducer = combineReducers({
//     auth: authReducer,
//     notes: noteReducer
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice.js";
import noteReducer from "./slices/notesSlice.js";

const rootReducer = combineReducers({
    auth: authReducer,
    notes: noteReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export { store };
