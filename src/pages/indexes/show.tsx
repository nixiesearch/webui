import { Box, Paper, ScrollArea, Space, Tabs } from "@mantine/core";
import { useApiUrl, useCustom, useOne, useParsed, useShow } from "@refinedev/core";
import { Prism } from '@mantine/prism';
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
  const { data: searchData } = useOne({
    resource: "search",
    id,
    meta: {
      params: {
        query: 'film'
      }
    }
  })

  console.log(searchData)
  return (
    <ScrollArea>
      <Tabs defaultValue="mapping">
        <Paper radius="md" shadow="md" p="xs">
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
          Search section
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
    </ScrollArea>
  );
};
