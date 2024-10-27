import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { requestBackend } from "../lib/axios";

function useVisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    const sendVisitData = async () => {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000;

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

    window.addEventListener("beforeunload", sendVisitData);

    return () => {
      window.removeEventListener("beforeunload", sendVisitData);
      sendVisitData();
    };
  }, [location]);
}

export default useVisitTracker;
