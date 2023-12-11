import React, { memo } from 'react';
import { EuiSpacer, EuiTitle, EuiHorizontalRule } from '@elastic/eui';
import { RequestBody } from './request_body';
import { RequestQueryParams } from './request_query_params';
import { AccordionSection } from '../accordion_section';
import { RequestHeaders } from './request_headers';
import { RequestHeadersCount } from './request_headers_count';
import { RequestQueryParamsCount } from './request_query_params_count';

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

      <AccordionSection
        title="Query Params"
        initiallyOpen={false}
        paddingSize="m"
        extraAction={<RequestQueryParamsCount />}
      >
        <RequestQueryParams />
      </AccordionSection>
      <EuiSpacer size="m" />
      <EuiHorizontalRule />

      <AccordionSection
        title="Request Headers"
        initiallyOpen={false}
        paddingSize="m"
        extraAction={<RequestHeadersCount />}
      >
        <RequestHeaders />
      </AccordionSection>
    </div>
  );
});
RequestLayout.displayName = 'RequestLayout';
