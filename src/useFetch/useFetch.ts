import {useReducer} from "react";
import {FetchHandler, IAPIRequest, TStatus} from "./fetchHandler";

export {useFetch};

const useFetch = (initialState: any) => {
  
  const fetchHandler = new FetchHandler();
  
  const initialStatus: TStatus = "asleep";
  
  if(!!initialState._status) {
    console.log("useFetch warning: you are overriding _status");
  }
  
  const [fetched, updateFetch]: [any, any] = useReducer(fetchHandler.reducer, {
    _status: initialStatus,
    ...initialState,
  });
  
  fetchHandler.setUpdateFetch(updateFetch);
  
  return [fetched, fetchHandler.fetch] as [any, (url: string, request: IAPIRequest) => void];
  
}