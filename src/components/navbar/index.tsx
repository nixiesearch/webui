import { rem, ScrollArea, NavLink, Button, Group, SimpleGrid } from "@mantine/core";
import classes from './styles.module.css';
import React, { useState } from "react";
import { useMenu } from "@refinedev/core";
import { NavLink as RouterLink } from "react-router-dom";
import { useConfig } from "../ConfigProvider";
import { IconBrandGithub, IconBrandSlack } from "@tabler/icons-react";

interface LinkProps {
  icon?: any;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links?: { label: string; link: string }[] | boolean;
}

const Link = ({ icon, label, initiallyOpened, links, link }: LinkProps) => {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      key={link.label}
      component={RouterLink}
      to={link.link}
      label={link.label}
    />
  ));

  if (!hasLinks) {
    return (
      <NavLink
        component={RouterLink}
        to={link}
        label={label}
        opened={opened}
        leftSection={
          icon && React.cloneElement(icon, { style: { width: rem(18), height: rem(18) } })
        }
      />
    );
  }

  return (
    <NavLink
      component="span"
      label={label}
      opened={opened}
      onClick={() => setOpened(!opened)}
      leftSection={
        icon && React.cloneElement(icon, { style: { width: rem(18), height: rem(18) } })
      }
    >
      {hasLinks && items}
    </NavLink>
  );
}

export const Navbar = () => {
  const { menuItems } = useMenu();
  const { schema } = useConfig()
  const items = Object.keys(schema)

  return (
    <nav className={classes.root}>
      <ScrollArea>
        {
          menuItems.map((item: any) => (
            <Link
              key={item.key}
              icon={item?.icon}
              label={item.label!}
              link={item.meta?.url || item.key}
              initiallyOpened={item.key === '/indexes'}
              links={
                item.key === '/indexes' &&
                items.map((item) => ({
                  label: item,
                  link: `/indexes/${item}`
                }))
              }
            />
          ))
        }
      </ScrollArea>
      <SimpleGrid cols={2}>
        <NavLink
          href="https://github.com/nixiesearch/nixiesearch"
          target="_blank"
          label="GitHub"
          leftSection={
            <IconBrandGithub />
          }
        />
        <NavLink
          href="https://communityinviter.com/apps/nixiesearch/nixiesearch"
          target="_blank"
          label="Slack"
          leftSection={
            <IconBrandSlack />
          }
        />
      </SimpleGrid>
    </nav>
  )
};
