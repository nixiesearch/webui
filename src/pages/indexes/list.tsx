import {
  Group,
  ScrollArea,
  Table,
  Text,
  Paper,
  Space,
} from "@mantine/core";
import { HttpError, useGo, useMany } from "@refinedev/core";
import { useConfig } from "../../components/ConfigProvider";
import { Index } from "../../types/Index";

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
      <Group style={{ flex: 1 }}>
        <Paper radius="md" shadow="md" p="xs">
          <div>
            <Text fz='lg'>
              Node
            </Text>
            <Text fz='sm'>
              {searcher.host}:{searcher.port}
            </Text>
          </div>
        </Paper>
        <Paper radius="md" shadow="md" p="xs">
          <Text fz='lg'>
            Indexes
          </Text>
          <Text fz='sm'>
            {Object.keys(schema).length}
          </Text>
        </Paper>
        <Paper radius="md" shadow="md" p="xs">
          <Text fz='lg'>
            Docs
          </Text>
          <Text fz='sm'>
            {countsMap.reduce((acc, count) => acc + count, 0)}
          </Text>
        </Paper>
      </Group>
      <Space h="md" />
      <ScrollArea>
        <Paper p="md">
          <Table verticalSpacing="md">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Latency</th>
                <th>Last updated</th>
              </tr>
            </thead>
            <tbody>
              { Object.keys(schema).map((key, i) => (
                <tr
                  key={key}
                  onClick={() => go({ to: `indexes/${key}` })}
                  style={{ cursor: "pointer" }}
                >
                  <td>{schema[key].name}</td>
                  <td>{countsMap[i]}</td>
                  <td>{schema[key].config.flush.interval}</td>
                  <td>{schema[key].name}</td>
                </tr>
              ))}
            </tbody>
            </Table>
          </Paper>
      </ScrollArea>
    </>
  )
}
