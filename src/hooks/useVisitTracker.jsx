import { useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

import { requestBackend } from "../lib/axios";

function useVisitTracker() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    console.log("useVisitTracker chamado: ", location);

    const endTime = Date.now();
    const timeSpent = (endTime - startTimeRef.current) / 1000;

    if (previousPath.current !== location.pathname) {
      sendVisitData(timeSpent);
      previousPath.current = location.pathname;
      startTimeRef.current = Date.now();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const totalTimeSpent = (Date.now() - startTimeRef.current) / 1000;
        sendVisitData(totalTimeSpent, true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sendVisitData((Date.now() - startTimeRef.current) / 1000, true);
    };
  }, [location.pathname]);

  useEffect(() => {
    const pendingData = JSON.parse(localStorage.getItem("pendingVisitData"));
    if (pendingData) {
      sendVisitData(pendingData.timeSpent, false, true);
      localStorage.removeItem("pendingVisitData");
    }
  }, []);

  const sendVisitData = async (
    timeSpent,
    useBeacon = false,
    isRetry = false
  ) => {
    const data = {
      pageVisited: location.pathname,
      timeSpent,
      browser: navigator.userAgent,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
    };

    if (useBeacon) {
      const success = navigator.sendBeacon(
        "/api/visitors",
        JSON.stringify(data)
      );
      if (!success) {
        localStorage.setItem("pendingVisitData", JSON.stringify(data));
      }
    } else {
      try {
        await requestBackend({
          method: "POST",
          url: "/api/visitors",
          data,
        });
      } catch (error) {
        if (!isRetry) {
          localStorage.setItem("pendingVisitData", JSON.stringify(data));
        }
        console.error("Erro ao enviar dados de visita:", error);
      }
    }
  };
}

export default useVisitTracker;
