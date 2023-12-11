import React, { memo } from 'react';
import { EuiHorizontalRule, EuiSpacer, EuiTitle } from '@elastic/eui';
import { ResponseBody } from './response_body';
import { AccordionSection } from '../accordion_section';
import { ResponseStatus } from './response_status';

export const ResponseLayout = memo(() => {
  return (
    <div>
      <EuiTitle size="xs">
        <h2>{'Response'}</h2>
      </EuiTitle>

      <EuiHorizontalRule margin="s" />
      <EuiSpacer size="m" />

      <AccordionSection title="Body" minHeight extraAction={<ResponseStatus />}>
        <ResponseBody />
      </AccordionSection>
    </div>
  );
});
ResponseLayout.displayName = 'ResponseLayout';
