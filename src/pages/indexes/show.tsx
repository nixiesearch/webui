import { Code, Group, Paper, Space, Tabs, Text, Title } from "@mantine/core";
import { useApiUrl, useOne, useParsed } from "@refinedev/core";
import { SearchTab } from "../../components/SearchTab";
import { CodeHighlight } from '@mantine/code-highlight';

export const IndexesShow = () => {
  const { id } = useParsed();

  const { data: statsData } = useOne({
    resource: "stats",
    id,
  })

  const { data: mappingData } = useOne({
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
          Version: <Code>{statsData?.luceneVersion}</Code>
        </Text>
        <Text c="dimmed">
          Leaves: <Code>{statsData?.leaves.length}</Code>
        </Text>
      </Group>
      <Space h="lg" />
      <Tabs defaultValue="search">
        <Paper
          radius="md"
          shadow="md"
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
        <Space h="md" />
        <Tabs.Panel value="search">
          {
            mappingData?.fields &&
            <SearchTab index={(id as string)} fields={mappingData?.fields} />
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
