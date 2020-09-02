import React from "react";
import styled from "styled-components";

const Line = styled.line`
  position: absolute;
  width: 737.5px;
  height: 0px;
  left: calc(50% - 737.5px / 2 + 369.25px);
  top: calc(50% - 0px / 2 - 322px);
  border: 1px solid #c4c4c4;
  transform: rotate(90deg);
`;
const HistoryTemp = styled.form`
  position: absolute;
  width: 750px;
  height: 269px;
  left: 79px;
  top: 220px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const History1 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  background: #c4c4c4;
`;
const History2 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  left: 96px;
  top: 298px;

  background: #c4c4c4;
`;
const History3 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  left: 96px;
  top: 355px;

  background: #c4c4c4;
`;
const History4 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  left: 96px;
  top: 412px;

  background: #c4c4c4;
`;

const HistoryRepTemp = styled.form`
  position: absolute;
  width: 750px;
  height: 269px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const HistoryRep1 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const HistoryRep2 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const HistoryRep3 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const HistoryRep4 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const ID = styled.input`
  position: absolute;
  width: 515px;
  height: 77px;
  left: 1213px;
  top: 262px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Email = styled.input`
  position: absolute;
  width: 515px;
  height: 75px;
  left: 1213px;
  top: 383px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const PW = styled.input`
  position: absolute;
  width: 515px;
  height: 77px;
  left: 1213px;
  top: 500px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const PW2 = styled.input`
  position: absolute;
  width: 515px;
  height: 74px;
  left: 1213px;
  top: 621px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Confirm = styled.input`
  position: absolute;
  width: 142px;
  height: 73px;
  left: 1586px;
  top: 763px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

const myPage = () => {
  return (
    <div>
      <div>
        <HistoryTemp>
          <History1></History1>
          <History2></History2>
          <History3></History3>
          <History4></History4>
        </HistoryTemp>
        <HistoryRepTemp>
          <HistoryRep1></HistoryRep1>
          <HistoryRep2></HistoryRep2>
          <HistoryRep3></HistoryRep3>
          <HistoryRep4></HistoryRep4>
        </HistoryRepTemp>
      </div>
      <Line></Line>
      <div>
        <ID></ID>
        <Email></Email>
        <PW></PW>
        <PW2></PW2>
        <Confirm></Confirm>
      </div>
    </div>
  );
};

export default myPage;
