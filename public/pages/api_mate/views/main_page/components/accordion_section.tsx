import React, { CSSProperties, memo, PropsWithChildren, useMemo } from 'react';
import { EuiAccordion, EuiSpacer, useEuiTheme, useGeneratedHtmlId } from '@elastic/eui';
import { HeaderDisplay } from './header_display';

export type AccordionSectionProps = PropsWithChildren<{
  title: string;
  initiallyOpen?: boolean;
  minHeight?: string | true;
}>;

export const AccordionSection = memo<AccordionSectionProps>(
  ({ title, initiallyOpen = true, minHeight, children }) => {
    const accordionId = useGeneratedHtmlId();
    const theme = useEuiTheme();

    const styles = useMemo(() => {
      const divStyles: CSSProperties = {
        background: theme.euiTheme.colors.lightestShade,
      };

      if (minHeight) {
        divStyles.minHeight = minHeight === true ? '30vh' : minHeight;
      }

      return divStyles;
    }, [minHeight, theme.euiTheme.colors.lightestShade]);

    const buttonTitle = useMemo(() => {
      return <HeaderDisplay>{title}</HeaderDisplay>;
    }, [title]);

    return (
      <EuiAccordion id={accordionId} buttonContent={buttonTitle} initialIsOpen={initiallyOpen}>
        <EuiSpacer size="s" />
        <div style={styles}>{children}</div>
      </EuiAccordion>
    );
  }
);
AccordionSection.displayName = 'AccordionSection';
