import React from "react";
import styled from "styled-components";

const TobBarLine = () => {
  return (
    <Container>
      <div className="one same_sty"></div>
      <div className="two same_sty"></div>
      <div className="three same_sty"></div>
      <div className="four same_sty"></div>
      <div className="five same_sty"></div>
      <div className="six same_sty"></div>
      <div className="seven same_sty"></div>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  /* margin-top: 20px; */

  position: relative;
  background-color: #e5e5e5;
  max-width: 1000px;
  min-width: 200px;
  height: 12px;
  .same_sty {
    height: 12px;
    position: absolute;
  }
  .one {
    background-color: #76da88;
    width: calc(100% - 50%);
    margin-left: 25%;
  }
  .two {
    background-color: #64926d;
    width: calc(100% - 64%);
    margin-left: 32%;
  }
  .three {
    background-color: #d75957;
    width: calc(100% - 78%);
    margin-left: 39%;
  }
  .four {
    background-color: #794443;
    width: calc(100% - 92%);
    margin-left: 46%;
  }
  .four {
    background-color: #841e1c;
    width: calc(100% - 92%);
    margin-left: 46%;
  }
  .five {
    background-color: #f1da58;
    width: 8%;
    margin-left: 54%;
  }
  .six {
    background-color: #c9ab02;
    width: 14%;
    margin-left: 62%;
  }
`;

export default TobBarLine;
