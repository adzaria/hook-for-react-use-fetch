import {useReducer} from "react";
import {FetchHandler, IAPIRequest, TStatus} from "./fetchHandler";

export {useFetch};


const useFetch = (initialState: any) => {
  
  const fetchHandler = new FetchHandler();
  
  const initialStatus: TStatus = "asleep";
  
  if(!!initialState._useFetchStatus) {
    console.log("useFetch warning: you are overriding _useFetchStatus");
  }
  
  const [fetched, updateFetch]: [any, any] = useReducer(fetchHandler.reducer, {
    _useFetchStatus: initialStatus,
    ...initialState,
  });
  
  fetchHandler.setUpdateFetch(updateFetch);
  
  return [fetched, fetchHandler.fetch] as [any, (url: string, request: IAPIRequest) => void];
  
}