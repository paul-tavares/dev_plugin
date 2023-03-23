import React, { memo } from 'react';
import { EuiCodeBlock, EuiTitle } from '@elastic/eui';

export interface ResponseOutputProps {
  // TODO: define props
}

export const ResponseOutput = memo<ResponseOutputProps>((props) => {
  return (
    <div>
      <EuiTitle size="xxs">
        <h3>{'Response'}</h3>
      </EuiTitle>
      <EuiCodeBlock lineNumbers={true} isCopyable={true}>{`
{
  data: {
    some: "data here"
  }
}
`}</EuiCodeBlock>
    </div>
  );
});
ResponseOutput.displayName = 'ResponseOutput';
