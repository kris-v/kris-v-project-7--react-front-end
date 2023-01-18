import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet TS', Helvetica, sans-serif;
    }

    body {
        margin: 0;
        height: 100%;
        box-sizing: border-box;
    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
