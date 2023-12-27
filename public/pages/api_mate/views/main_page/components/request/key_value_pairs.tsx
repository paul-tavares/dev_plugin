import React, { memo, useCallback, useMemo } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiEmptyPrompt,
  EuiText,
  EuiButtonIcon,
  type EuiFieldTextProps,
} from '@elastic/eui';
import { v4 as uuidV4 } from 'uuid';
import { KeyValueList } from '../../../../types';

export interface KeyValuePairsProps {
  value: KeyValueList;
  onChange: (newValue: KeyValueList) => void;
  emptyState?: React.ReactNode;
}

type KeyValuePair = KeyValueList[number];

export const KeyValuePairs = memo<KeyValuePairsProps>(({ value, onChange, emptyState }) => {
  const keyValueRowOnChangeHandler: KeyValueRowProps['onChange'] = useCallback(
    ({ new: newPair, old: oldPair }) => {
      const updatedValue: KeyValueList = [];

      for (const keyValuePair of value) {
        if (keyValuePair.id === oldPair.id) {
          if (newPair) {
            updatedValue.push(newPair);
          }
        } else {
          updatedValue.push(keyValuePair);
        }
      }

      onChange(updatedValue);
    },
    [onChange, value]
  );

  const rowEntries = useMemo(() => {
    if (value.length === 0) {
      return (
        <EuiEmptyPrompt
          color="transparent"
          titleSize="xxs"
          hasShadow
          title={<div style={{ fontWeight: 500 }}>{'No entries defined'}</div>}
          body={emptyState ?? <KeyValuePairsEmptyState />}
        />
      );
    }

    return value.map((keyValueData) => {
      return (
        <KeyValueRow
          data={keyValueData}
          key={keyValueData.id}
          onChange={keyValueRowOnChangeHandler}
        />
      );
    });
  }, [keyValueRowOnChangeHandler, value]);

  const addNewRowHandler = useCallback(() => {
    const newValues = [...value];
    newValues.push({
      name: '',
      value: '',
      id: uuidV4(),
    });

    onChange(newValues);
  }, [onChange, value]);

  return (
    <div>
      {rowEntries}

      <EuiButton size="s" onClick={addNewRowHandler}>
        {'Add'}
      </EuiButton>
    </div>
  );
});
KeyValuePairs.displayName = 'KeyValuePairs';

export interface KeyValueRowProps {
  data: KeyValuePair;
  onChange: (update: { old: KeyValuePair; new: KeyValuePair | undefined }) => void;
}

export const KeyValueRow = memo<KeyValueRowProps>(({ data, onChange }) => {
  const nameOnChangeHandler: EuiFieldTextProps['onChange'] = useCallback(
    (ev) => {
      onChange({
        old: data,
        new: { ...data, name: ev.target.value },
      });
    },
    [data, onChange]
  );

  const valueOnChangeHandler: EuiFieldTextProps['onChange'] = useCallback(
    (ev) => {
      onChange({
        old: data,
        new: { ...data, value: ev.target.value },
      });
    },
    [data, onChange]
  );

  const removeRowHandler = useCallback(() => {
    onChange({
      old: data,
      new: undefined,
    });
  }, [data, onChange]);

  return (
    <EuiFormRow fullWidth>
      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem>
          <EuiFieldText
            value={data.name}
            onChange={nameOnChangeHandler}
            fullWidth
            placeholder="name"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFieldText
            value={data.value}
            onChange={valueOnChangeHandler}
            fullWidth
            placeholder="value"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon iconType="trash" onClick={removeRowHandler} aria-label={'remove item'} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
});
KeyValueRow.displayName = 'KeyValueRow';

export const KeyValuePairsEmptyState = memo(() => {
  return (
    <EuiText size="s">
      <p>{'Click Add for new entry'}</p>
    </EuiText>
  );
});
KeyValuePairsEmptyState.displayName = 'KeyValuePairsEmptyState';
