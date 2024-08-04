import { Paper, ScrollArea, Space, Title } from "@mantine/core"
import { useConfig } from "../../components/ConfigProvider"
import { CodeHighlight } from "@mantine/code-highlight"

export const ConfigShow = () => {
  const config = useConfig()
  return (
    <>
      <Title>
        Configuration
      </Title>
      <Space h="md" />
      <ScrollArea>
        <Paper radius="md" shadow="md" p="xs">
          <CodeHighlight language="json" code={JSON.stringify(config, null, 2)} />
        </Paper>
      </ScrollArea>
    </>
  )
}
