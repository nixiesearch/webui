import { ActionIcon, Box, Button, CheckIcon, CloseButton, Combobox, Group, Paper, Pill, PillsInput, Select, Space, Stack, Text, TextInput, Title, useCombobox } from "@mantine/core"
import { useApiUrl, useCustom } from "@refinedev/core"
import { useEffect, useState } from "react";
import classes from './styles.module.css'
import { useMediaQuery } from "@mantine/hooks";
import { IconCross, IconX } from "@tabler/icons-react";

const ComboboxComponent = ({ name, options, onChange }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);
  const match = useMediaQuery('sm')
  
  useEffect(() => onChange(value), [value])

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item: any) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const items = options
    .filter((item) => item.term.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item.term} key={item.term} active={value.includes(item.term)}>
        <Group gap="sm" wrap="nowrap">
          { value.includes(item.term) && <CheckIcon size={12} /> }
          <Text truncate>
            {item.term}
          </Text>
          <Text size="xs" c="dimmed" ms='auto' truncate>{item.count}</Text>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Box className={classes.facetContainer}>
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            multiline
            label={name}
            onClick={() => combobox.openDropdown()}
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
          >
            <Pill.Group>
              {values}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder={`Select ${name}`}
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown visibleFrom="sm">
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {items.length > 0 ? items : <Combobox.Empty>Nothing found...</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }} hiddenFrom="sm">
          {items.length > 0 ? items : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox>
    </Box>
  )
}

const FacetComponent = ({ name, type, options, onChange }) => {
  if (type === 'text[]') return (
    <ComboboxComponent name={name}  options={options} onChange={onChange} />
  )

  return null
}

export const Facets = ({ fields, index, onChange }) => {
  const apiUrl = useApiUrl()

  const { data: facets } = useCustom({
    url: `${apiUrl}/${index}/_search`,
    method: "post",
    config: {
      payload: {
        aggs: Object.keys(fields)
          .filter(key => fields[key].facet && fields[key].type === 'text[]')
          .reduce((acc: any, field: string) => ({
          ...acc,
          [field]: {
            term: {
              field
            }
          }
        }), {}),
      }
    }
  })

  if (!facets) return null

  return (
    <dialog
      id="filters"
      className={classes.filters}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === 'DIALOG' &&
        document.querySelector<HTMLDialogElement>('#filters')?.close()
      }
    >
      <Paper radius="md" shadow="md" p="md" h="auto">
        <Group justify="space-between">
          <Text size="xl">
            Filters
          </Text>
          <CloseButton
            size='sm'
            hiddenFrom="sm"
            onClick={() => document.querySelector<HTMLDialogElement>('#filters')?.close()}
          />
        </Group>
        <Stack gap="md">
          {
            Object.keys(facets.data?.aggs).map((facet) => (
              <FacetComponent
                key={facet}
                name={facet}
                type={fields[facet].type}
                options={facets.data.aggs[facet].buckets}
                onChange={(value) => onChange(facet, value)}
                />
            ))
          }
        </Stack>
        <Space h='sm' />
      </Paper>
    </dialog>
  )
}
