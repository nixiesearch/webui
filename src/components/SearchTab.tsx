import { useApiUrl, useCustom } from "@refinedev/core"
import { useState } from "react";
import { ActionIcon, Badge, Button, Card, Center, Code, Divider, Flex, Grid, Group, Image, Input, Loader, NumberInput, Paper, ScrollArea, Select, SimpleGrid, Slider, Space, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { IconAlertCircle, IconCircle, IconPlus } from "@tabler/icons-react";
import { CodeHighlight } from '@mantine/code-highlight';

const getInputByType = (field: any, onChange: any) => {
  const { type } = field
  if (type === 'text') return (
    <TextInput
      placeholder="Search string..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  )
  if (type === 'text[]') return (
    <TextInput
      placeholder="Multiple strings..."
      onChange={e => onChange(e.currentTarget.value)}
      rightSection={
        <Tooltip label="Use coma separator to define multiple strings" position="top-end" withArrow>
          <div>
            <IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5 }} />
          </div>
        </Tooltip>
      }
    />
  )
  if (type === 'int') return (
    <NumberInput
      placeholder="Int value..."
      type="number"
      onChange={val => onChange(Number(val))}
    />
  )
  if (type === 'long') return (
    <NumberInput
      placeholder="Big int..."
      type="number"
      onChange={val => onChange(Number(val))}
    />
  )
  if (type === 'float') return (
    <NumberInput
      placeholder="Float number..."
      type="number"
      step={0.05}
      precision={2}
      onChange={val => onChange(val)}
    />
  )
  return null
}

const Items = (item: any) => {
  const { _id, image_url, title, _score, ...rest } = item
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section style={{ position: 'relative' }}>
        <Image
          src={image_url}
          height={160}
          radius="sm"
        />
        <Badge color="pink" style={{ position: 'absolute', right: 6, top: 6 }}>
          score: {_score}
        </Badge>
      </Card.Section>
      <Code fz="sm" mt='md' block>
        {_id}
      </Code>
      <Group mt="md" mb="xs" wrap="nowrap">
        <Title order={4}>
          <Text truncate>
            {title}
          </Text>
        </Title>
      </Group>
      <Group mt="md" mb="xs">
        <ScrollArea h={300}>
          <CodeHighlight language="json" code={JSON.stringify(item, null, 2)}/>
        </ScrollArea>
      </Group>
    </Card>
  )
}

export const SearchTab = ({
  index,
  fields
}: {
  index: string,
  fields: any
  }) => {
  const [field, setField] = useState<string | null>()
  const [value, setValue] = useState<any>()

  const apiUrl = useApiUrl()

  const { data, isFetching } = useCustom({
    url: `${apiUrl}/${index}/_search`,
    method: "post",
    queryOptions: {
      enabled: !!value
    },
    config: {
      payload: {
        fields: Object.keys(fields),
        query: {
          match: {
            [field as string]: value
          }
        }
      }
    }
  })

  return (
    <>
      <Group>
        <Paper radius="md" shadow="md" p="xs">
          <Flex gap="md">
            <Select
              searchable
              data={Object.keys(fields).filter(f => fields[f].search).map((field) => ({ value: field, label: field }))} 
              placeholder="Select field"
              onChange={(value) => setField(value)}
            />
            {
              field && getInputByType(fields[field], setValue)
            }
          </Flex>
        </Paper>
        <ActionIcon size="xl" disabled aria-label="Add filter">
          <IconPlus size={18} />
        </ActionIcon>
      </Group>
      <Space h="lg" />
      {
        !data && !value &&
        <Center>
          <Text fz="lg" c="dimmed">
            Use filters and above to search elements in current index
          </Text>
        </Center>
      }
      {
        
        isFetching
          ? <Center>
              <Loader size={50} />
            </Center>
          : <SimpleGrid
              spacing="lg"
              type="container"
              cols={{ base: 1, '500px': 2, '700px': 3, '980px': 4 }}
            >
            {
              data?.data?.hits.map((hit: any) => <Items key={hit._id} {...hit} />)
            }
            </SimpleGrid>
      }
    </>
  )
}
