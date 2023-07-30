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
        font-family: 'Nanum Myeongjo', serif;
        font-size: 10px;
        overflow: hidden;
    }
    a {
        color: inherit;
        text-decoration: none;
    }

    button {
        border: none;
	    outline: none;
	    border-radius: 5px;

        :hover {
            cursor: pointer;
        }
    }

`;

export default GlobalStyle;
