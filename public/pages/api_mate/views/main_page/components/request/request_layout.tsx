import React, { memo } from 'react';
import { EuiSpacer, EuiTitle, EuiHorizontalRule } from '@elastic/eui';
import { RequestBody } from './request_body';
import { RequestQueryParams } from './request_query_params';
import { AccordionSection } from '../accordion_section';
import { RequestHeaders } from './request_headers';

export const RequestLayout = memo(() => {
  return (
    <div>
      <EuiTitle size="xs">
        <h2>{'Request'}</h2>
      </EuiTitle>

      <EuiHorizontalRule margin="s" />
      <EuiSpacer size="m" />

      <AccordionSection title="Body" minHeight>
        <RequestBody />
      </AccordionSection>

      <EuiSpacer size="xl" />
      <EuiHorizontalRule />

      <AccordionSection title="Query Params" initiallyOpen={false}>
        <RequestQueryParams />
      </AccordionSection>
      <EuiSpacer size="m" />
      <EuiHorizontalRule />

      <AccordionSection title="Request Headers" initiallyOpen={false}>
        <RequestHeaders />
      </AccordionSection>
    </div>
  );
});
RequestLayout.displayName = 'RequestLayout';
