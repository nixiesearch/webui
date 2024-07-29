import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/mantine";
import { Outlet, Route, Routes } from "react-router-dom";
import { CategoryCreate, CategoryList } from "../pages/categories";
import { ErrorComponent } from "@refinedev/core";
import NixieIcon from './icons/Nixie.svg';
import { Menu } from "./menu";
import { IndexesList, IndexesShow } from "../pages/indexes";

const Layout = () => (
  <ThemedLayoutV2
    Sider={() => (
      <ThemedSiderV2
        render={(props) => <Menu {...props} />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            icon={<img src={NixieIcon} alt="Nixie" style={{ width: 24 }} />}
            text="Nixiesearch"
          />
        )}
      />
    )}
  
  >
    <Outlet />
  </ThemedLayoutV2>
)

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<IndexesList />} />
      <Route path="/indexes">
        <Route index element={<IndexesList />} />
        <Route path=":id" element={<IndexesShow />} />
      </Route>
      <Route path="/metrics">
        <Route index element={<CategoryList />} />
        <Route path="create" element={<CategoryCreate />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
)
