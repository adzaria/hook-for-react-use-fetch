export {FetchHandler};

type TMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'POSTFILE';
type TCredentials = 'include' | 'omit' | 'same-origin' | undefined;
export type TStatus = 'asleep' | 'fetching' | 'fetched' | 'error';

export interface IAPIRequest {
  
  url?: string;
  method: TMethod;
  credentials?: TCredentials;
  headers?: any;
  body?: any;
  files?: any[];
}

class FetchHandler {
  
  private updateFetch: ((action: { type: string, value: any }) => void) | null;
  
  constructor() {
    
    this.updateFetch = null;
  }
  
  /**
   * Has to be set after creating the instance, otherwise will throw an error
   * @param updateFetch
   */
  setUpdateFetch(updateFetch: (action: { type: string, value: any }) => void) {
    
    this.updateFetch = updateFetch;
  }
  
  fetch = async(url: string, request: IAPIRequest) => {
    
    if(!this?.updateFetch) {
      throw new Error('updateFetch from useFetch MUST be set through instance.setUpdateFetch');
    }
    
    if(!url) {
      throw new Error('useFetch: an url must be provided');
    }
    
    if(!request?.method) {
      throw new Error('useFetch: a method must be provided');
    }
    
    this.updateFetch({type: "START_FETCHING", value: null});
    
    try {
      
      const apiRequest: IAPIRequest = {
        url: url,
        method: request.method,
      };
      
      (!!request.body) && (apiRequest.body = JSON.stringify(request.body));
      (!!request.headers) && (apiRequest.headers = new Headers({"Content-Type": 'application/json', ...request.headers,}));
      (!request.headers) && (apiRequest.headers = new Headers({"Content-Type": 'application/json',}));
      apiRequest.credentials = request.credentials || undefined;
      
      let fetched: any;
      
      if(apiRequest.method === 'POSTFILE') {
        apiRequest.body = JSON.stringify({
          ...request.body,
          files: request.files || [],
        });
      }
  
      console.log("dev useFetch request ", apiRequest)
  
      fetched = await fetch(url, apiRequest);
      
      const fetchedJson = await fetched.json()
      
      if(fetched.status < 200 || fetched.status >= 300) {
        return this.updateFetch({type: "FETCHING_ERROR", value: fetchedJson});
      }
      
      return this.updateFetch({type: "SET_SUCCESS", value: fetchedJson});
      
    } catch (error) {
      
      this.updateFetch({type: "FETCHING_ERROR", value: {}});
    }
    
  }
  
  public reducer(state: any, action: { type: string, value: any, }) {
    
    switch(action.type) {
      
      case "SET_STATUS":
        return ({
          ...state,
          _status: action.value,
        });
      
      case "START_FETCHING":
        return ({
          ...state,
          _status: "fetching",
        });
      
      case "FETCHING_ERROR":
        return ({
          ...state,
          ...action.value,
          _status: "error",
        });
      
      case "SET_SUCCESS":
        return ({
          ...state,
          ...action.value,
          _status: "fetched",
        });
      
      default:
        throw new Error("Unknown action type");
      
    }
    
  }
  
}