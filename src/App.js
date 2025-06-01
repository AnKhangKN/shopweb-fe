import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import AdminLayout from "./layout/admin/AdminLayout";
import React from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          const Path = route.path;
          const Page = route.page;

          let Layout = React.Fragment;

          if (route.isLayOutAdmin === true) {
            Layout = AdminLayout;
          }

          const Element = Page ? (
            <>
              <Layout>
                <Page />
              </Layout>
            </>
          ) : (
            <>
              <NotFoundPage />
            </>
          );

          return <Route key={index} path={Path} element={Element} />;
        })}

        {/* Route fallback khi không khớp path nào */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
