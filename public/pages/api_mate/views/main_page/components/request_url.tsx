import React, { memo } from 'react';
import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';

export interface RequestUrlProps {
  // TODO: define props
}

export const RequestUrl = memo<RequestUrlProps>((props) => {
  // TODO:PT implement onChange to input
  // TODO:PT implement onKeyUp (Enter)
  // TODO:PT implement Send button click

  return (
    <EuiFlexGroup wrap={false} responsive={false}>
      <EuiFlexItem grow={false}>{'verb'}</EuiFlexItem>

      <EuiFlexItem>
        <EuiFieldText
          placeholder="API URL (relative to hostname). Example: /api/endpoint/something"
          value={''}
          onChange={(e) => {}}
          aria-label="Enter API url"
          fullWidth
        />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconType="frameNext" iconSide="right" onClick={() => {}}>
          {'Send'}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
});
RequestUrl.displayName = 'RequestUrl';
