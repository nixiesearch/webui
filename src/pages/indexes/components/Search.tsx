import { useApiUrl, useCustom } from "@refinedev/core"
import { useMemo, useState } from "react";
import { ActionIcon, Badge, Box, Button, Card, Center, Code, Divider, Flex, Grid, Group, Image, Input, Loader, NumberInput, Paper, ScrollArea, Select, SimpleGrid, Slider, Space, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { IconAlertCircle, IconPlus, IconSearch } from "@tabler/icons-react";
import { CodeHighlight } from '@mantine/code-highlight';
import { Facets } from "./Facets";

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

export const Search = ({
  index,
  fields
}: {
  index: string,
  fields: any
}) => {
  const [field, setField] = useState<string | null>()
  const [query, setQuery] = useState<any>()
  const [search, setSearch] = useState<any>()
  const [selectedFacets, setSelectedFacets] = useState<any>({})
  
  const apiUrl = useApiUrl()

  const selectedFacetsKeys = Object.keys(selectedFacets).filter((field) => !!selectedFacets[field].length)
  const queryMatch = {}

  if (search) {
    queryMatch[field as string] = search
  }

  const filters = !selectedFacetsKeys.length ? undefined : {
    include: {
      and: selectedFacetsKeys.reduce((acc, key) => ([
        ...acc,
        ...selectedFacets[key].reduce((acc, value) => ([
          ...acc,
          { term: { [key]: value } }
        ]), [])
      ]), [])
    }
  }


  const { data, isFetching } = useCustom({
    url: `${apiUrl}/${index}/_search`,
    method: "post",
    queryOptions: {
      enabled: !!search
    },
    config: {
      payload: {
        fields: Object.keys(fields),
        filters,
        query: {
          match: { [field as string]: search }
        },
      }
    }
  })

  const searchableFields = useMemo(() => {
    return Object.keys(fields).filter(f => fields[f].search).map((field) => ({ value: field, label: field }))
  }, [fields])

  return (
    <>
      <Group gap='md' align="flex-start">
        <Facets
          fields={fields}
          index={index}
          onChange={(field, value) => setSelectedFacets({
            ...selectedFacets,
            [field as string]: value
          })}
        />
        <Box flex={1}>
          <form onSubmit={(e) => { e.preventDefault(); setSearch(query) }}>
            <Group wrap="nowrap">
              <Paper radius="md" shadow="md" p="xs">
                <Flex gap="md">
                  <Select
                    searchable
                    data={searchableFields} 
                    placeholder="Select field"
                    onChange={setField}
                  />
                  {
                    field &&
                    <TextInput
                      placeholder={`Search by ${field}...`}
                      onChange={e => setQuery(e.currentTarget.value)}
                    />
                  }
                </Flex>
              </Paper>
              <ActionIcon
                size="xl"
                type="submit"
                aria-label="Search by field"
                disabled={!field || !query}
              >
                <IconSearch size={18} />
              </ActionIcon>
            </Group>
          </form>
          <Space h="lg" />
          {
            !data && !search &&
            <Center>
              <Text fz="lg" c="dimmed">
                Use filters and search and above to find elements in current index
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
        </Box>
      </Group>
    </>
  )
}
