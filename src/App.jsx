import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRoutes } from "./routes/route";
import { Fragment } from "react";
import "./index.css";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={<Navigate to="/admin/invoices" replace />}
        />
        {adminRoutes.map((route, index) => {
          const Layout = route.Layout || Fragment;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
