import { styled } from "styled-components";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
    height: 2000px;
`

function App() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
  </Wrapper>
  );
}

export default App;
