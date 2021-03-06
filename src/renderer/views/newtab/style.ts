import { css } from 'styled-components';

import { body2 } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';

export const Style = css`
  body {
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow-x: hidden;
    ${body2()}
    ${({ theme }: { theme?: ITheme }) => css`
      background-color: ${theme['pages.backgroundColor']};
      color: ${theme['pages.textColor']};
    `};

    &::-webkit-scrollbar {
      display: none;
    }
  }

  * {
    box-sizing: border-box;
  }
`;
