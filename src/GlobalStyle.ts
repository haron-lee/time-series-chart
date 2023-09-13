import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  /* Font */
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Lighter';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }

  /* Reset */
  ${reset}

  :root {
    /* 컬러 변수 */
    --bg: #fff;
    --dark-bg: #001D26;
    --deep-bg: #23272a;
    --gray-400: #b6c9d6;
    --gray-500: #99aab5;
    --gray-800: #76838d;
    --primary: #7CA0AD;
    --red: #FF5200;
  }

  /* tag reset */
  body {
    background-color: var(--dark-bg);
    box-sizing: border-box;
    font-family: 'Pretendard-Regular';
  }

  button {
    padding: 0;
    border: none;
    background-color: inherit;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
    border: none;
    padding: 0;
    box-sizing: border-box;
    }

    ul, li {
      list-style: none;
    }
`;

export default GlobalStyle;
