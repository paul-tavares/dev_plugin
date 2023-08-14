import React, { memo, PropsWithChildren, useMemo } from 'react';
import { EuiAccordion, EuiSpacer, useGeneratedHtmlId } from '@elastic/eui';
import { HeaderDisplay } from './header_display';

export type AccordionSectionProps = PropsWithChildren<{
  title: string;
  initiallyOpen?: boolean;
}>;

export const AccordionSection = memo<AccordionSectionProps>(
  ({ title, initiallyOpen = true, children }) => {
    const accordionId = useGeneratedHtmlId();
    const buttonTitle = useMemo(() => {
      return <HeaderDisplay>{title}</HeaderDisplay>;
    }, [title]);

    return (
      <EuiAccordion id={accordionId} buttonContent={buttonTitle} initialIsOpen={initiallyOpen}>
        <EuiSpacer size="s" />
        {children}
      </EuiAccordion>
    );
  }
);
AccordionSection.displayName = 'AccordionSection';
