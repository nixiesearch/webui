import { useApiUrl, useCustom } from "@refinedev/core"
import { useState } from "react";
import { Badge, Button, Card, Center, Code, Divider, Flex, Grid, Group, Image, Input, Loader, NumberInput, Paper, ScrollArea, Select, SimpleGrid, Slider, Space, Text, TextInput, Tooltip } from '@mantine/core';
import { IconAlertCircle, IconCircle, IconPlus } from "@tabler/icons-react";
import { Prism } from "@mantine/prism";

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
      <Card.Section>
        <Image
          src={image_url}
          height={160}
        />
      </Card.Section>
      <Code fz="sm" mt='md' block>
        {_id}
      </Code>
      <Group position="apart" mt="md" mb="xs" noWrap>
        <Text weight={500} truncate>
          {title}
        </Text>
        <Badge color="pink" variant="light">
          score: {_score}
        </Badge>
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <ScrollArea h={300}>
          <Prism language="json">
            {JSON.stringify(item, null, 2)}
          </Prism>
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
      <Paper radius="md" shadow="md" p="xs">
        <Flex gap="md">
          <Select
            searchable
            dropdownPosition="bottom"
            data={Object.keys(fields).filter(f => fields[f].search).map((field) => ({ value: field, label: field }))} 
            placeholder="Select field"
            onChange={(value) => setField(value)}
          />
          {
            field && getInputByType(fields[field], setValue)
          }
        </Flex>
      </Paper>
      <Space h="md" />
      {
        isFetching
          ? <Center>
              <Loader size={50} />
            </Center>
          : <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: 980, cols: 3, spacing: 'md' },
                { maxWidth: 755, cols: 2, spacing: 'sm' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
              ]}
            >
            {
              data?.data?.hits.map((hit: any) => <Items key={hit._id} {...hit} />)
            }
            </SimpleGrid>
      }
    </>
  )
}
