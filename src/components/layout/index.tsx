import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from '../../icons/Nixie.svg';

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group px='md'>
            <img src={logo} width={30} />
            <Title size={20}>Nixie Search</Title>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main bg="gray.2">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
