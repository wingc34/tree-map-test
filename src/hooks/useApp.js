import { useCallback, useState } from "react";

const useApp = () => {
  const [json, setJson] = useState("");
  const [rowNum, setRowNum] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [renderRows, setRenderRows] = useState([]);
  const [firstRowWeight, setfirstRowWeight] = useState(0);

  const onJsonChange = (e) => {
    setJson(e.target.value);
  };
  const onRowNumChange = (e) => {
    setRowNum(e.target.value);
  };

  const jsonChecking = (parsedJson) => {
    if (parsedJson.length > 50) {
      setErrMsg("Please enter a json that length within 50.");
      return false;
    }
    parsedJson.forEach((item) => {
      if (item.name.length > 50) {
        setErrMsg("Please enter each item name less than 50 characters.");
      } else if (typeof item.name !== "string") {
        setErrMsg("Please enter each item name in string.");
      } else if (!Number.isInteger(item.weight)) {
        setErrMsg("Please enter each item weight in integer.");
      } else {
        setErrMsg("");
      }
    });
    return parsedJson.every(
      (item) =>
        item.name.length <= 50 &&
        typeof item.name === "string" &&
        Number.isInteger(item.weight)
    );
  };

  const rowNumChecking = useCallback(
    (jsonLength) => {
      const newRowNum = parseInt(rowNum);
      if (typeof newRowNum !== "number" && !Number.isInteger(newRowNum)) {
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

      console.log("sortedRenderItems", sortedRenderItems);

      let finalRenderItems = [];
      for (let i = 0; i < rowNum; i++) {
        finalRenderItems.push([]);
      }
      console.log("finalRenderItems", finalRenderItems);

      let i = 0;
      sortedRenderItems.forEach((sortedItem) => {
        finalRenderItems[i].push(sortedItem);
        if (i + 1 < rowNum) {
          i++;
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
          console.log("all valid");
          setRenderRows(getRenderRows(parsedJson, rowNum));
        }
      }
    } catch (err) {
      console.log(`err`, err);
      setErrMsg("Please enter a valid JSON.");
    }
  }, [getRenderRows, json, rowNum, rowNumChecking]);

  return {
    json,
    rowNum,
    errMsg,
    onJsonChange,
    onRowNumChange,
    onButtonClick,
    renderRows,
    firstRowWeight,
  };
};

export default useApp;