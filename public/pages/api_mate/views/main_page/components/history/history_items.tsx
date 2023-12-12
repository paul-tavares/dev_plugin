import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  EuiButtonEmpty,
  EuiEmptyPrompt,
  EuiText,
  EuiPopover,
  useGeneratedHtmlId,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiBadge,
  EuiFieldSearch,
} from '@elastic/eui';
import { EuiFieldSearchProps } from '@elastic/eui/src/components/form/field_search/field_search';
import { useApiMateHistory } from '../../../../components/api_mate_history';
import { createState, useApiMateState } from '../../../../components/api_mate_store';
import { TextTruncate } from '../../../../components/text_truncate';
import { ApiMateHistoryItem } from '../../../../types';

export const HistoryItems = memo(() => {
  const { items } = useApiMateHistory();
  const [searchValue, setSearchValue] = useState('');

  const entryList = useMemo(() => {
    const displayEntries: JSX.Element[] = [];

    for (const item of items) {
      if (!searchValue || historyItemMatches(item, searchValue)) {
        displayEntries.push(<HistoryItem key={item.created} item={item} />);
      }
    }

    return displayEntries;
  }, [items, searchValue]);

  const handleSearchValueOnChange: EuiFieldSearchProps['onChange'] = useCallback((ev) => {
    setSearchValue(ev.target.value);
  }, []);

  if (items.length === 0) {
    return (
      <EuiEmptyPrompt
        body={
          <EuiText>
            <p>{'No history'}</p>
          </EuiText>
        }
        titleSize="xs"
      />
    );
  }

  return (
    <div>
      <div>
        <EuiFieldSearch
          placeholder="search history"
          value={searchValue}
          onChange={handleSearchValueOnChange}
          isClearable
          aria-label="search history items"
        />
      </div>
      <div>{entryList}</div>
    </div>
  );
});
HistoryItems.displayName = 'HistoryItems';

export interface HistoryItemProps {
  item: ApiMateHistoryItem;
}

export const HistoryItem = memo<HistoryItemProps>(
  ({ item: { created, wasSuccess, ...requestState } }) => {
    const [, setApiMateState] = useApiMateState();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverContentHtmlId = useGeneratedHtmlId();

    const buttonClickHandler = useCallback(() => {
      setApiMateState({
        ...createState(),
        ...requestState,
      });
    }, [requestState, setApiMateState]);

    const buttonOnMouseEnterHandler = useCallback(() => {
      setIsPopoverOpen(true);
    }, []);

    const buttonOnMouseLeaveHandler = useCallback(() => {
      setIsPopoverOpen(false);
    }, []);

    const closePopoverHandler = useCallback(() => {
      setIsPopoverOpen(false);
    }, []);

    const button = useMemo(() => {
      return (
        <EuiButtonEmpty
          key={created}
          onClick={buttonClickHandler}
          onMouseEnter={buttonOnMouseEnterHandler}
          onMouseLeave={buttonOnMouseLeaveHandler}
        >
          <EuiFlexGroup responsive={false} gutterSize="xs">
            <EuiFlexItem grow={false}>
              <EuiBadge>{requestState.destination === 'elasticsearch' ? 'ES' : 'KBN'}</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem grow={false} className="eui-textTruncate">
              <TextTruncate value={requestState.url} size="s" />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiButtonEmpty>
      );
    }, [
      buttonClickHandler,
      buttonOnMouseEnterHandler,
      buttonOnMouseLeaveHandler,
      created,
      requestState.url,
    ]);

    return (
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={closePopoverHandler}
        button={button}
        display="block"
        anchorPosition="rightCenter"
        initialFocus={`#${popoverContentHtmlId}`}
        ownFocus={false}
      >
        <EuiText
          id={popoverContentHtmlId}
          style={{ maxWidth: '50vh', minWidth: '300px' }}
          tabIndex={-1}
          size="s"
        >
          <div className="eui-textBreakWord">
            <EuiBadge>{requestState.httpVerb.toUpperCase()}</EuiBadge> {requestState.url}
          </div>
          <EuiHorizontalRule margin="s" />
          <EuiFlexGroup responsive={false}>
            <EuiFlexItem>
              <div className="eui-textBreakWord">{new Date(created).toLocaleString()}</div>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiIcon
                type={wasSuccess ? 'check' : 'minusInCircle'}
                color={wasSuccess ? 'success' : 'danger'}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiText>
      </EuiPopover>
    );
  }
);
HistoryItem.displayName = 'HistoryItem';

const historyItemMatches = (
  { url, requestHeaders, requestBody, requestParams }: ApiMateHistoryItem,
  matchString: string
): boolean => {
  return JSON.stringify([url, requestHeaders, requestBody, requestHeaders])
    .toLocaleString()
    .includes(matchString.toLowerCase());
};
