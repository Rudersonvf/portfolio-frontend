import { useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

import { requestBackend } from "../lib/axios";

function useVisitTracker() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const endTime = Date.now();
    const timeSpent = (endTime - startTimeRef.current) / 1000;

    if (previousPath.current !== location.pathname) {
      sendVisitData(timeSpent);
      previousPath.current = location.pathname;
      startTimeRef.current = Date.now();
    }

    const handleBeforeUnload = () => {
      const totalTimeSpent = (Date.now() - startTimeRef.current) / 1000;
      sendVisitData(totalTimeSpent);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sendVisitData((Date.now() - startTimeRef.current) / 1000);
    };
  }, [location]);

  const sendVisitData = async (timeSpent) => {
    try {
      await requestBackend({
        method: "POST",
        url: "/api/visitors",
        data: {
          pageVisited: location.pathname,
          timeSpent,
          browser: navigator.userAgent,
          device: /Mobi|Android/i.test(navigator.userAgent)
            ? "Mobile"
            : "Desktop",
        },
      });
    } catch (error) {
      console.error("Erro ao enviar dados de visita:", error);
    }
  };
}
export default useVisitTracker;
