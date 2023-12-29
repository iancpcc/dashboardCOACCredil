export interface AppStateEntity<T> {
    state?: DataState
    data?: T | never []| null
    error?: CustomError
  }


  export enum DataState{
    LOADING,
    LOADED,
    ERROR
  }

  export type CustomError = {
    code?:number,
    message?:string,
    messageDeveloper?:string
  }


