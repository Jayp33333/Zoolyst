import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Initialize with your Measurement ID
ReactGA.initialize("G-2MLGMGHPL5"); // replace with your GA ID

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Send a pageview when the route changes
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}

export default AnalyticsTracker;
