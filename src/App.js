import React, { Suspense } from "react";

import "./App.css";

const MobileComponent = React.lazy(() => import("./Mobile/Mobile.js"));
const DesktopComponent = React.lazy(() => import("./Home/Home.js"));

function App() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="App">
      <Suspense>
        {isMobile ? <MobileComponent /> : <DesktopComponent />}
      </Suspense>
    </div>
  );
}

export default App;
