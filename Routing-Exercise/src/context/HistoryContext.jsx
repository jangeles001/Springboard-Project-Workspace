import { createContext, useContext } from 'react'


export const HistoryContext = createContext();


export function useHistoryContext() {
  return useContext(HistoryContext);
}