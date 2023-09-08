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
} from '@elastic/eui';
import { useApiMateHistory } from '../../../../components/api_mate_history';
import { createState, useApiMateState } from '../../../../components/api_mate_store';
import { TextTruncate } from '../../../../components/text_truncate';
import { ApiMateHistoryItem } from '../../../../types';

export const HistoryItems = memo(() => {
  const { items } = useApiMateHistory();

  const entryList = useMemo(() => {
    return items.map((requestData) => {
      return <HistoryItem key={requestData.created} item={requestData} />;
    });
  }, [items]);

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

  return <div>{entryList}</div>;
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
          <TextTruncate value={requestState.url} size="s" />
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
        <EuiText id={popoverContentHtmlId} style={{ maxWidth: '300px' }} tabIndex={-1} size="s">
          <div className="eui-textBreakWord">
            <EuiBadge>{requestState.httpVerb.toUpperCase()}</EuiBadge> {requestState.url}
          </div>
          <EuiHorizontalRule margin="s" />
          <EuiFlexGroup responsive={false}>
            <EuiFlexItem>
              <div className="eui-textBreakWord">{new Date(created).toLocaleString()}</div>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiIcon type={wasSuccess ? 'check' : 'minusInCircle'} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiText>
      </EuiPopover>
    );
  }
);
HistoryItem.displayName = 'HistoryItem';
