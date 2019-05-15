import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  buyCredits,
  insertFreeAd,
  insertPaidAd,
  enablePostAds
} from "./actions";
import Edit from "./Edit";
import Profile from "./Profile";
import InsertAdPanel from "./InsertAdPanel";

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
  display: grid;
  grid-template-rows: 2;
  justify-items: stretch;
  grid-column-start: 3;
  grid-row-start: 1;
  border: 1px solid black;
  grid-row-gap: 10px;
  padding: 10px;
`;

const Credits = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-row-start: 2;
  border: 1px solid black;
  width: 100%;
`;

const Dashboard = props => {
  const { categories, credits, me } = props.simpleReducer;
  const { history } = props;

  return (
    <Container>
      <Chart>
        <InsertAdPanel history={history} />
      </Chart>
      <InsertAd>
        <Profile />
        <Credits>
          {credits} Credits
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={() => {
              props.buyCredits();
              props.enablePostAds();
            }}
          >
            Buy Credits
          </Button>
        </Credits>
      </InsertAd>
      <Manage>
        <Edit />
      </Manage>
    </Container>
  );
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      buyCredits: buyCredits,
      insertFreeAd,
      insertPaidAd,
      enablePostAds
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

// export default Dashboard;
