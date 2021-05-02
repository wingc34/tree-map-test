import { useCallback, useState } from "react";

const useApp = () => {
  const [json, setJson] = useState("");
  const [rowNum, setRowNum] = useState(1);
  const [errMsg, setErrMsg] = useState("");
  const [renderRows, setRenderRows] = useState([]);
  const [firstRowWeight, setfirstRowWeight] = useState(0);

  const onJsonChange = (e) => {
    setJson(e.target.value);
  };
  const onRowNumChange = (e) => {
    setRowNum(e.target.value);
  };

  const jsonChecking = useCallback((parsedJson) => {
    if (parsedJson.length > 50) {
      setErrMsg("Please enter a json that length within 50.");
      return false;
    }
    for (let i = 0; i < parsedJson.length; i++) {
      if (parsedJson[i].name.length > 50) {
        setErrMsg("Please enter each item name less than 50 characters.");
        break;
      } else if (typeof parsedJson[i].name !== "string") {
        setErrMsg("Please enter each item name in string.");
        break;
      } else if (
        !Number.isInteger(parsedJson[i].weight) ||
        parsedJson[i].weight <= 0
      ) {
        setErrMsg("Please enter each item weight in integer.");
        break;
      } else {
        setErrMsg("");
      }
    }
    return parsedJson.every(
      (item) =>
        item.name.length <= 50 &&
        typeof item.name === "string" &&
        Number.isInteger(item.weight)
    );
  }, []);

  const rowNumChecking = useCallback(
    (jsonLength) => {
      const newRowNum = parseInt(rowNum);
      if (!Number.isInteger(newRowNum)) {
        setErrMsg("Please enter row number in integer");
        return false;
      } else if (newRowNum > jsonLength || newRowNum <= 0) {
        setErrMsg("Please enter row number within the json length");
        return false;
      } else {
        setErrMsg("");
        return true;
      }
    },
    [rowNum]
  );

  const getRenderRows = useCallback(
    (parsedJson) => {
      const propComparator = (prop) => {
        return function (a, b) {
          return a[prop] - b[prop];
        };
      };

      const sortedRenderItems = parsedJson
        .slice()
        .sort(propComparator("weight"))
        .reverse();

      let finalRenderItems = [];
      for (let i = 0; i < rowNum; i++) {
        finalRenderItems.push([]);
      }

      let i = 0;
      sortedRenderItems.forEach((sortedItem) => {
        finalRenderItems[i].push(sortedItem);
        if (i + 1 < rowNum) {
          i++;
        } else if (
          i <= Math.floor(sortedRenderItems.length / 2) &&
          rowNum !== 1
        ) {
          i = 1;
        } else {
          i = 0;
        }
      });

      let tempWeight = 0;

      finalRenderItems[0].forEach((item) => {
        tempWeight += item.weight;
      });
      setfirstRowWeight(tempWeight);

      return finalRenderItems;
    },
    [rowNum]
  );

  const onButtonClick = useCallback(() => {
    try {
      const parsedJson = JSON.parse(json);

      if (typeof parsedJson !== "object") {
        setErrMsg("Please enter a valid JSON.");
      } else {
        const isValid =
          jsonChecking(parsedJson) && rowNumChecking(parsedJson.length);
        if (isValid) {
          setRenderRows(getRenderRows(parsedJson, rowNum));
        }
      }
    } catch (err) {
      console.log(`err`, err);
      setErrMsg("Please enter a valid JSON.");
    }
  }, [getRenderRows, json, jsonChecking, rowNum, rowNumChecking]);

  const onPrettifyJsonClick = useCallback(() => {
    const parsedJson = JSON.parse(json);

    setJson(JSON.stringify(parsedJson, undefined, 4));
  }, [json]);

  return {
    json,
    rowNum,
    errMsg,
    renderRows,
    firstRowWeight,
    onJsonChange,
    onRowNumChange,
    onButtonClick,
    onPrettifyJsonClick,
  };
};

export default useApp;
