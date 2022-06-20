import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const Dashboard = React.lazy(() =>
    import("./components/dashboard/dashboard")
  );
  const PointData = React.lazy(() =>
    import("./components/pointData/pointData")
  );

  return (
    <div className="App">
      <Suspense fallback={<span>Loading ...</span>}>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/PointDetails" element={<PointData />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
