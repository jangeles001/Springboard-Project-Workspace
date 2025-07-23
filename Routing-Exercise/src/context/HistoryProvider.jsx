import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HistoryContext } from './HistoryContext';

export function HistoryProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const historyStack = useRef([]);
  const isNavigatingBack = useRef(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;

    const lastPath = historyStack.current[historyStack.current.length - 1];

    if (!isNavigatingBack.current && currentPath !== lastPath) {
      historyStack.current.push(currentPath);

      // limit stack size
      if (historyStack.current.length > 20) {
        historyStack.current.shift(); // Remove oldest
      }
    }

    isNavigatingBack.current = false;
    setCanGoBack(historyStack.current.length > 1);
  }, [location]);

  const goBack = () => {
    if (historyStack.current.length > 1) {
      isNavigatingBack.current = true;
      // Remove current path
      historyStack.current.pop();

      const previousPath = historyStack.current[historyStack.current.length - 1];
      navigate(previousPath);
    }
  };

  return (
    <HistoryContext.Provider value={{ goBack, canGoBack }}>
      {children}
    </HistoryContext.Provider>
  );
}