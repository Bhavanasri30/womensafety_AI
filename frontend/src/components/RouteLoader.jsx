import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";

export default function RouteLoader({ children }) {
  return (
    <Suspense fallback={<LoadingScreen message="Opening Nari-Shield..." />}>
      {children}
    </Suspense>
  );
}