import React, { memo } from 'react';
import { EuiSpacer, EuiTitle } from '@elastic/eui';
import { RequestBody } from './request_body';
import { RequestQueryParams } from './request_query_params';
import { AccordionSection } from '../accordion_section';

export const RequestLayout = memo(() => {
  return (
    <div>
      <EuiTitle size="xs">
        <h2>{'Request'}</h2>
      </EuiTitle>

      <AccordionSection title="Body">
        <RequestBody />
      </AccordionSection>

      <EuiSpacer size="xl" />

      <AccordionSection title="Headers" initiallyOpen={false}>
        <RequestQueryParams />
      </AccordionSection>
    </div>
  );
});
RequestLayout.displayName = 'RequestLayout';
