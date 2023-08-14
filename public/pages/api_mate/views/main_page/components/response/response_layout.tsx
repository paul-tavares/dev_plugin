import React, { memo } from 'react';
import { EuiTitle } from '@elastic/eui';
import { ResponseBody } from './response_body';
import { AccordionSection } from '../accordion_section';

export const ResponseLayout = memo(() => {
  return (
    <div>
      <EuiTitle size="xs">
        <h2>{'Response'}</h2>
      </EuiTitle>

      <AccordionSection title="Body">
        <ResponseBody />
      </AccordionSection>
    </div>
  );
});
ResponseLayout.displayName = 'ResponseLayout';
