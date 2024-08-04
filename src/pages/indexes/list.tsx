import {
  Group,
  ScrollArea,
  Table,
  Text,
  Paper,
  Space,
  ActionIcon,
  Code,
  SimpleGrid,
} from "@mantine/core";
import { HttpError, useGo, useMany } from "@refinedev/core";
import { useConfig } from "../../components/ConfigProvider";
import { Index } from "../../types/Index";
import { IconEye } from "@tabler/icons-react";

const countDocs = (index: Index) => index.leaves.reduce((acc, leaf) => acc + leaf.numDocs, 0)

export const IndexesList = () => {
  const go = useGo()
  const { schema, searcher } = useConfig()
  const { data, isFetching } = useMany<Index, HttpError>({
    resource: "stats",
    ids: Object.keys(schema),
  })

  if (isFetching) return null

  const countsMap = data!.data.map(countDocs)

  return (
  <>
      <SimpleGrid cols={{ base: 1, sm: 3}}>
        <Paper radius="md" shadow="md" p="xs">
          <div>
            <Text fz='lg'>
              Node
            </Text>
            <Code fz='sm'>
              {searcher.host}:{searcher.port}
            </Code>
          </div>
        </Paper>
        <Paper radius="md" shadow="md" p="xs">
          <Text fz='lg'>
            Indexes
          </Text>
          <Code fz='sm'>
            {Object.keys(schema).length}
          </Code>
        </Paper>
        <Paper radius="md" shadow="md" p="xs">
          <Text fz='lg'>
            Docs
          </Text>
          <Code fz='sm'>
            {countsMap.reduce((acc, count) => acc + count, 0)}
          </Code>
        </Paper>
      </SimpleGrid>
      <Space h="md" />
      <Paper p="md">
        <ScrollArea>
          <Table
            verticalSpacing="md"
            miw={700}
            highlightOnHover
            highlightOnHoverColor="gray.1"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Size</Table.Th>
                <Table.Th>Latency</Table.Th>
                <Table.Th>Last updated</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              { Object.keys(schema).map((key, i) => (
                <Table.Tr
                  key={key}
                  onClick={() => go({ to: `/indexes/${key}` })}
                  style={{ cursor: "pointer", borderRadius: 10 }}
                >
                  <Table.Th>{schema[key].name}</Table.Th>
                  <Table.Th>{countsMap[i]}</Table.Th>
                  <Table.Th>{schema[key].config.flush.interval}</Table.Th>
                  <Table.Th>{schema[key].name}</Table.Th>
                  <Table.Th align="right">
                    <ActionIcon aria-label="View index">
                      <IconEye size={18} />
                    </ActionIcon>
                  </Table.Th>
                </Table.Tr>
              ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
    </>
  )
}
