import { useApiUrl, useCustom, useMenu } from "@refinedev/core";
import { NavLink } from "@mantine/core";
import { Config } from "../../types/config";
import type { SiderRenderProps } from "@refinedev/ui-types/src/types/layout";
import { Link } from "react-router-dom";
import { TreeMenuItem } from "@refinedev/core/dist/hooks/menu/useMenu";
import { useThemedLayoutContext } from "@refinedev/mantine";
import { useConfig } from "../ConfigProvider";

const IndexesMenu = ({
  item,
  collapsed
}: {
  item: TreeMenuItem,
  collapsed: boolean
}) => {
  const { siderCollapsed, mobileSiderOpen } = useThemedLayoutContext()
  const { schema } = useConfig()

  console.log(item)
  const items = Object.keys(schema)
  return (
    <NavLink
      component={Link as any}
      label={collapsed ? null : item.name}
      icon={item.icon}
      mt={12}
      pl={siderCollapsed || mobileSiderOpen ? "12px" : "18px"}
      defaultOpened
    >
      {
        items.map(i =>
          <NavLink
            key={i}
            label={i}
            to={item.key + '/' + i}
            component={Link as any}
          />
        )
      }
    </NavLink>
  )
}

export const Menu = ({ items, collapsed }: SiderRenderProps) => {
  const { menuItems } = useMenu();

  console.log(menuItems)
  return items.map((item: any) => {
    if (collapsed) return item
    if (item.props.resource === 'indexes') return (
      <IndexesMenu
        key={item.key}
        item={menuItems.find(i => i.name === item.props.resource)!}
        collapsed={collapsed}
      />
    )
    return item
  });
};
