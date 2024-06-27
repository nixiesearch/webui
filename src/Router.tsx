import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mantine";
import { Outlet, Route, Routes } from "react-router-dom";
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "./pages/blog-posts";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories";
import { ErrorComponent } from "@refinedev/core";
import NixieIcon from './components/icons/Nixie.svg';
import { HomeShow } from "./pages/home";

const Layout = () => (
  <ThemedLayoutV2
    Title={({ collapsed }) => (
      <ThemedTitleV2
        collapsed={collapsed}
        icon={<img src={NixieIcon} alt="Nixie" style={{ width: 24 }} />}
        text="Nixiesearch"
      />
    )}
  
  >
    <Outlet />
  </ThemedLayoutV2>
)

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomeShow />} />
      <Route path="/indexes">
        <Route index element={<BlogPostList />} />
        <Route path="create" element={<BlogPostCreate />} />
        <Route path="edit/:id" element={<BlogPostEdit />} />
        <Route path="show/:id" element={<BlogPostShow />} />
      </Route>
      <Route path="/metrics">
        <Route index element={<CategoryList />} />
        <Route path="create" element={<CategoryCreate />} />
        <Route path="edit/:id" element={<CategoryEdit />} />
        <Route path="show/:id" element={<CategoryShow />} />
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
)
