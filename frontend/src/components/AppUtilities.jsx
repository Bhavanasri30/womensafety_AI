import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AppUtilities() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    document.title = "Nari-Shield AI";
  }, []);

  return null;
}