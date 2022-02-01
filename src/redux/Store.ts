import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/rootReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {encryptTransform} from 'redux-persist-transform-encrypt';


const initialState = {}

const encryptor = encryptTransform({
    secretKey: 'my-super-secret-key',
    onError: (err) => {
      console.error(err);
    },
  });
  
  const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  
  const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["complaint_reducer","registerComplaint","address"],
    whitelist: ["loggin"],
    transforms: [encryptor]
  };
  
  const pReducer = persistReducer(persistConfig,rootReducers);
  
  const configureStore = (initialState:any) => {
    return createStore(
      pReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk))
    );
  };
  
  export const store = configureStore(initialState);
  export const persistor = persistStore(store);
  