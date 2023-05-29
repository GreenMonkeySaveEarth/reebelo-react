import React, { useEffect, createContext, useContext, useState } from 'react';
import { getCsrfToken, getHeader } from '../../util/session.js';

export const SessionContext = createContext(null);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState(null);
    const [axiosHeader, setAxiosHeader] = useState(null);
    useEffect(() => {
        async function fetchToken() {
          const token = await getCsrfToken();
          setCsrfToken(token);
          setAxiosHeader(getHeader(token));
        }
        fetchToken();
      }, []);
    
    return (
        <SessionContext.Provider value={{ csrfToken, axiosHeader }}>
            {children}
        </SessionContext.Provider>
    )
};

