import styled from "styled-components/macro";
import DataInput from "./components/dataInput";
import TreeMap from "./components/treeMap";
import useApp from "./hooks/useApp";

const SAppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

function App() {
  const {
    json,
    rowNum,
    errMsg,
    renderRows,
    firstRowWeight,
    onJsonChange,
    onRowNumChange,
    onButtonClick,
    onPrettifyJsonClick,
  } = useApp();

  return (
    <SAppContainer>
      <DataInput
        json={json}
        rowNum={rowNum}
        errMsg={errMsg}
        onJsonChange={onJsonChange}
        onRowNumChange={onRowNumChange}
        onButtonClick={onButtonClick}
        onPrettifyJsonClick={onPrettifyJsonClick}
      />
      <TreeMap renderRows={renderRows} firstRowWeight={firstRowWeight} />
    </SAppContainer>
  );
}

export default App;
