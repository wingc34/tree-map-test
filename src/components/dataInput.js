import React from "react";
import styled from "styled-components/macro";

const SDataInputContainer = styled.div`
  width: 50%;
`;

const SJsonInputContainer = styled.div`
  margin-bottom: 10px;
`;

const SJsonInputTitle = styled.div`
  /* color: #fff; */
  font-size: 20px;
`;

const SJsonInput = styled.textarea`
  resize: none;
  overflow: auto;
`;

const SRowInputContainer = styled.div``;

const SRowInputTitle = styled.div``;

const SRowInput = styled.input``;

const SGenarateBtn = styled.button`
  margin-top: 15px;
  font-size: 18px;
`;

const SErrorMsg = styled.div`
  margin-top: 15px;
  color: red;
`;

const DataInput = ({
  json,
  rowNum,
  errMsg,
  onJsonChange,
  onRowNumChange,
  onButtonClick,
}) => {
  return (
    <SDataInputContainer>
      <SJsonInputContainer>
        <SJsonInputTitle>Please enter your Data Json: </SJsonInputTitle>
        <SJsonInput rows="30" cols="50" value={json} onChange={onJsonChange} />
      </SJsonInputContainer>
      <SRowInputContainer>
        <SRowInputTitle>Please enter row number: </SRowInputTitle>
        <SRowInput value={rowNum} onChange={onRowNumChange} />
      </SRowInputContainer>
      <SGenarateBtn onClick={onButtonClick}>Generate Tree Map</SGenarateBtn>
      <SErrorMsg>{errMsg}</SErrorMsg>
    </SDataInputContainer>
  );
};

export default DataInput;
