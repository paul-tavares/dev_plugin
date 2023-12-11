import React, { memo, useMemo } from 'react';
import { type EuiTextProps, EuiText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export interface TextTruncateProps extends Omit<EuiTextProps, 'children'> {
  value: string;
  showLast?: number;
}

export const TextTruncate = memo<TextTruncateProps>(({ showLast = 15, value, ...txtProps }) => {
  // FIXME:PT Delete this and use `EuiTextTruncate` when that version of Eui (88.2.0) is available

  const leftSide = useMemo(() => {
    if (showLast === 0) {
      return value;
    }

    return value.substring(0, value.length - showLast);
  }, [showLast, value]);

  const rightSide = useMemo(() => {
    if (showLast === 0) {
      return '';
    }

    return value.substring(value.length - showLast);
  }, [showLast, value]);

  return (
    <EuiText {...txtProps}>
      {showLast === 0 ? (
        leftSide
      ) : (
        <EuiFlexGroup responsive={false} gutterSize="none">
          <EuiFlexItem grow={false} className="eui-textTruncate">
            <div className="eui-textTruncate">{leftSide}</div>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>{rightSide}</EuiFlexItem>
        </EuiFlexGroup>
      )}
    </EuiText>
  );
});
TextTruncate.displayName = 'TextTruncate';
