import { Paper, Space, Tabs, Text } from "@mantine/core";
import { useApiUrl, useOne, useParsed } from "@refinedev/core";
import { Prism } from '@mantine/prism';
import { SearchTab } from "../../components/SearchTab";
import 'prism-json-fold'

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
    <Tabs defaultValue="search">
      <Paper
        radius="md"
        shadow="md"
        p="xs"
        style={{ position: 'sticky', top: 0, zIndex: 1 }}
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
            <Prism language="json">
              {JSON.stringify(mappingData, null, 2)}
            </Prism>
          </Paper>
        }
      </Tabs.Panel>
      <Tabs.Panel value="stats">
        {
          statsData &&
          <Paper radius="md" shadow="md" p="xs">
            <Prism language="json">
              {JSON.stringify(statsData, null, 2)}
            </Prism>
          </Paper>
        }
      </Tabs.Panel>
    </Tabs>
  );
};
