import { ActionIcon, Button, Code, Group, Paper, Space, Tabs, Text, Title } from "@mantine/core";
import { useOne, useParsed } from "@refinedev/core";
import { CodeHighlight } from '@mantine/code-highlight';
import { Stats } from "../../types/stats";
import { Mapping } from "../../types/mapping";
import { Search } from "./components/Search";
import { IconFilter } from "@tabler/icons-react";
import { DialogHTMLAttributes } from "react";

export const IndexesShow = () => {
  const { id } = useParsed();

  const { data: statsData } = useOne<Stats>({
    resource: "stats",
    id,
  })

  const { data: mappingData } = useOne<Mapping>({
    resource: "mapping",
    id,
  })

  return (
    <>
      <Title>
        {id}
      </Title>
      <Space h="md" />
      <Group>
        <Text c="dimmed">
          Version: <Code>{statsData?.data.luceneVersion}</Code>
        </Text>
        <Text c="dimmed">
          Leaves: <Code>{statsData?.data.leaves.length}</Code>
        </Text>
      </Group>
      <Space h="lg" />
      <Tabs defaultValue="search">
        <Group>
          <ActionIcon
            size="xl"
            hiddenFrom="sm"
            aria-label="Apply filters"
            variant="light"
            onClick={() => document.querySelector<HTMLDialogElement>('#filters')?.showModal()}
          >
            <IconFilter size={18} />
          </ActionIcon>
          <Paper
            radius="md"
            shadow="md"
            flex={1}
            p="xs"
            style={{
              position: 'sticky',
              top: 60, 
              zIndex: 1
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="search">
                Search
              </Tabs.Tab>
              <Tabs.Tab value="mapping">
                Mapping
              </Tabs.Tab>
              <Tabs.Tab value="stats">
                Stats
              </Tabs.Tab>
            </Tabs.List>
          </Paper>
        </Group>
        <Space h="md" />
        <Tabs.Panel value="search">
          {
            mappingData?.data.fields &&
            <Search
              index={(id as string)}
              fields={mappingData?.data.fields}
            />
          }
        </Tabs.Panel>
        <Tabs.Panel value="mapping">
          {
            mappingData &&
            <Paper radius="md" shadow="md" p="xs">
              <CodeHighlight language="json" code={JSON.stringify(mappingData, null, 2)}/>
            </Paper>
          }
        </Tabs.Panel>
        <Tabs.Panel value="stats">
          {
            statsData &&
            <Paper radius="md" shadow="md" p="xs">
              <CodeHighlight language="json" code={JSON.stringify(statsData, null, 2)}/>
            </Paper>
          }
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
