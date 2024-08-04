import { Route, Routes } from "react-router-dom";
import { ErrorComponent } from "@refinedev/core";
import { IndexesList, IndexesShow } from "./pages/indexes";
import { Layout } from "./components/layout";
import { ConfigShow } from "./pages/config";

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<IndexesList />} />
      <Route path="/indexes">
        <Route index element={<IndexesList />} />
        <Route path=":id" element={<IndexesShow />} />
      </Route>
      <Route path="/config">
        <Route index element={<ConfigShow />} />
      </Route>
      <Route path="/metrics">
        {/* <Route index element={<CategoryList />} />
        <Route path="create" element={<CategoryCreate />} /> */}
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
)
