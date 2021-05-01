import styled from "styled-components/macro";
import DataInput from "./components/dataInput";
import TreeMap from "./components/treeMap";
import useApp from "./hooks/useApp";

const SAppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

function App() {
  const {
    json,
    rowNum,
    errMsg,
    onJsonChange,
    onRowNumChange,
    onButtonClick,
    renderRows,
    firstRowWeight,
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
      />
      <TreeMap renderRows={renderRows} firstRowWeight={firstRowWeight} />
    </SAppContainer>
  );
}

export default App;
