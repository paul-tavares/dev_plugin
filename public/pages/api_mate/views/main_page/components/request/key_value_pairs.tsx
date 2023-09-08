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

export interface KeyValuePairsProps {
  value: Record<string, string>;
  onChange: (newValue: Record<string, string>) => void;
}

export const KeyValuePairs = memo<KeyValuePairsProps>(({ value, onChange }) => {
  const keyValueRowOnChangeHandler: KeyValueRowProps['onChange'] = useCallback(
    ({ new: newPair, old: oldPair }) => {
      const updatedValue = {
        ...value,
      };

      delete updatedValue[oldPair.name];

      if (newPair) {
        updatedValue[newPair.name] = newPair.value;
      }

      onChange(updatedValue);
    },
    [onChange, value]
  );

  const rowEntries = useMemo(() => {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return (
        <EuiEmptyPrompt
          body={
            <EuiText>
              <p>{'No entries defined'}</p>
            </EuiText>
          }
          titleSize="xs"
        />
      );
    }

    return entries.map(([key, keyValue], index) => {
      return (
        <KeyValueRow
          name={key}
          value={keyValue}
          key={`item${index}`}
          onChange={keyValueRowOnChangeHandler}
        />
      );
    });
  }, [keyValueRowOnChangeHandler, value]);

  const addNewRowHandler = useCallback(() => {
    onChange({
      ...value,
      '': '',
    });
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

interface KeyValuePair {
  name: string;
  value: string;
}

export interface KeyValueRowProps extends KeyValuePair {
  onChange: (update: { old: KeyValuePair; new: KeyValuePair | undefined }) => void;
}

export const KeyValueRow = memo<KeyValueRowProps>(({ name, value, onChange }) => {
  const nameOnChangeHandler: EuiFieldTextProps['onChange'] = useCallback(
    (ev) => {
      onChange({
        old: { name, value },
        new: { name: ev.target.value, value },
      });
    },
    [name, onChange, value]
  );

  const valueOnChangeHandler: EuiFieldTextProps['onChange'] = useCallback(
    (ev) => {
      onChange({
        old: { name, value },
        new: { name, value: ev.target.value },
      });
    },
    [name, onChange, value]
  );

  const removeRowHandler = useCallback(() => {
    onChange({
      old: { name, value },
      new: undefined,
    });
  }, [name, onChange, value]);

  return (
    <EuiFormRow fullWidth>
      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem>
          <EuiFieldText value={name} onChange={nameOnChangeHandler} fullWidth placeholder="name" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFieldText
            value={value}
            onChange={valueOnChangeHandler}
            fullWidth
            placeholder="value"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon iconType="trash" onClick={removeRowHandler} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
});
KeyValueRow.displayName = 'KeyValueRow';
