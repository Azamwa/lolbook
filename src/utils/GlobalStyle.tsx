import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    html, body {
        padding: 0;
        margin: 0;
        font-family: 'Jua', sans-serif;
        font-size: 10px;
        overflow: hidden;
    }
    a {
        color: inherit;
        text-decoration: none;
    }

`;

export default GlobalStyle;
