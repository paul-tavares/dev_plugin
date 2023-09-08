import { EuiBadge, EuiSelectable, EuiText } from '@elastic/eui';
import React, { memo, useCallback, useMemo } from 'react';
import { EuiSelectableProps } from '@elastic/eui/src/components/selectable/selectable';
import { useApiMateHistory } from '../../../../components/api_mate_history';
import { useApiMateState } from '../../../../components/api_mate_store';
import { ApiMateHistoryItem } from '../../../../types';

export interface ApiRouteSuggestionsProps {
  onSelect: (selection: ApiMateHistoryItem) => void;
}

export const ApiRouteSuggestions = memo<ApiRouteSuggestionsProps>(({ onSelect }) => {
  const [, setApiMateState] = useApiMateState();
  const { items: historyItems } = useApiMateHistory();

  const selectionOptions: EuiSelectableProps['options'] = useMemo(() => {
    return historyItems.map((historyItem) => {
      return {
        key: historyItem.created,
        label: historyItem.url,
        data: historyItem,
        prepend: <EuiBadge>{historyItem.httpVerb.toUpperCase()}</EuiBadge>,
      };
    });
  }, [historyItems]);

  const routeSelectHandler: EuiSelectableProps['onChange'] = useCallback(
    (_, __, option) => {
      setApiMateState((prevState) => {
        return {
          ...prevState,
          url: option.data.url,
          httpVerb: option.data.httpVerb,
        };
      });

      onSelect(option);
    },
    [onSelect, setApiMateState]
  );

  return (
    <EuiSelectable
      aria-label="Route suggestions"
      options={selectionOptions}
      onChange={routeSelectHandler}
      listProps={{ bordered: true, showIcons: false }}
      searchable={true}
      singleSelection={true}
      emptyMessage={<EuiText>{'No suggestions'}</EuiText>}
    >
      {(list, search) => {
        return (
          <>
            {list}

            {historyItems.length > 10 && search}
          </>
        );
      }}
    </EuiSelectable>
  );
});
ApiRouteSuggestions.displayName = 'ApiRouteSuggestions';
