import React from "react";
import styled from "styled-components/macro";

const STreeMapContainer = styled.div`
  width: 100%;
  margin-left: 50px;

  @media only screen and (max-width: 1000px) {
    margin-left: 0px;
  }
`;

const STreeMapTitle = styled.div`
  font-size: 20px;
`;

const STreeMapAreaContainer = styled.div`
  width: 1000px;
  height: 800px;
  border: blue 1px solid;
  @media only screen and (max-width: 1000px) {
    width: 100%;
    height: 400px;
  }
`;

const STreeMapRow = styled.div`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.calHeight}%;
`;

const STreeMapItem = styled.div`
  font-size: 1em;
  flex: 0 0 ${(props) => props.calWeight}%;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(props) => (props.isGreen > 0 ? "green" : "red")};
  display: flex;
`;

const STreeMapItemContent = styled.div`
  word-break: break-all;
`;

const TreeMapRow = ({ item, firstRowWeight, renderRowsLength }) => {
  return (
    <STreeMapRow calHeight={(1 / renderRowsLength) * 100}>
      {item.map((val, i) => {
        const percent = val.value * 100;
        const calWeight = ((val.weight / firstRowWeight) * 100).toFixed(2);
        return (
          <STreeMapItem
            calWeight={calWeight}
            isGreen={percent > 0}
            key={`tree-map-item-${i}`}
          >
            <STreeMapItemContent>
              {val.name}
              <br />
              {percent}%
            </STreeMapItemContent>
          </STreeMapItem>
        );
      })}
    </STreeMapRow>
  );
};

const TreeMap = ({ renderRows, firstRowWeight }) => {
  return (
    <STreeMapContainer>
      <STreeMapTitle>Tree Map Result: </STreeMapTitle>
      <STreeMapAreaContainer>
        {renderRows.map((item, i) => {
          return (
            <TreeMapRow
              item={item}
              firstRowWeight={firstRowWeight}
              renderRowsLength={renderRows.length}
              key={`tree-map-row-${i}`}
            />
          );
        })}
      </STreeMapAreaContainer>
    </STreeMapContainer>
  );
};

export default TreeMap;
