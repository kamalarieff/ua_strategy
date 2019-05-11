import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  display: grid;
  grid-template-columns: 10vw 3fr 1fr 10vw;
  width: 100vw;
  height: 100vh;
  margin-top: 10vh;
  grid-gap: 10px 10px;
`;

const Manage = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
  border: 1px solid black;
  padding: 10px;
`;

const Chart = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  border: 1px solid black;
  padding: 10px;
`;

const InsertAd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-column-start: 3;
  grid-row-start: 1;
  border: 1px solid black;
`;

const Credits = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const AdLimits = () => {
  const data = {
    Car: 1,
    Property: 1,
    Jobs: 1,
    "Mobile Phones": 1,
    "Everything else": -1
  };

  return (
    <>
      <h1>Car: 1</h1>
      <h1>Property: 1</h1>
      <h1>Jobs: 1</h1>
      <h1>Mobile Phones: 1</h1>
      <h1>Everything else: No Limit</h1>
    </>
  );
};

const Dashboard = () => {
  return (
    <Container>
      <Chart>
        <AdLimits />
      </Chart>
      <InsertAd>
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          Insert Ad
        </Button>
        <Credits>
          50 Credits
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Buy Credits
          </Button>
        </Credits>
      </InsertAd>
      <Manage>All your edit ad goes here</Manage>
    </Container>
  );
};

export default Dashboard;
