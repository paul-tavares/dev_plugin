import React, { CSSProperties, memo, PropsWithChildren, useMemo } from 'react';
import { EuiAccordion, EuiSpacer, useEuiTheme, useGeneratedHtmlId } from '@elastic/eui';
import { EuiAccordionProps } from '@elastic/eui/src/components/accordion/accordion';
import { HeaderDisplay } from './header_display';

export type AccordionSectionProps = Pick<EuiAccordionProps, 'paddingSize' | 'extraAction'> &
  PropsWithChildren<{
    title: string;
    initiallyOpen?: boolean;
    minHeight?: string | true;
  }>;

export const AccordionSection = memo<AccordionSectionProps>(
  ({ title, initiallyOpen = true, minHeight, paddingSize, extraAction, children }) => {
    const accordionId = useGeneratedHtmlId();
    const theme = useEuiTheme();

    const styles = useMemo(() => {
      const divStyles: CSSProperties = {
        background: theme.euiTheme.colors.lightestShade,
      };

      if (minHeight) {
        divStyles.minHeight = minHeight === true ? '30vh' : minHeight;
      }

      if (paddingSize && paddingSize !== 'none' && theme.euiTheme.size[paddingSize]) {
        divStyles.padding = theme.euiTheme.size[paddingSize];
      }

      return divStyles;
    }, [minHeight, theme.euiTheme.colors.lightestShade]);

    const buttonTitle = useMemo(() => {
      return <HeaderDisplay>{title}</HeaderDisplay>;
    }, [title]);

    return (
      <EuiAccordion
        id={accordionId}
        buttonContent={buttonTitle}
        initialIsOpen={initiallyOpen}
        extraAction={extraAction}
      >
        <EuiSpacer size="s" />
        <div style={styles}>{children}</div>
      </EuiAccordion>
    );
  }
);
AccordionSection.displayName = 'AccordionSection';
