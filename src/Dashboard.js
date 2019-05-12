import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { insertCarAd, buyCredits, insertAd } from "./actions";

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

const CategoryLimitWithButton1 = props => {
  return (
    <div className={props.className}>
      <h2>
        {props.title}: {props.count} / {props.limit}
      </h2>
      <Button
        variant="contained"
        color="primary"
        disabled={props.count === props.limit && props.credits === 0}
        style={{ margin: "20px" }}
        onClick={props.clickHandler}
      >
        Insert Ad
      </Button>
    </div>
  );
};

const StyledCategoryLimitWithButton1 = styled(CategoryLimitWithButton1)`
  display: flex;
  flex-direction: row;
`;

const Dashboard = props => {
  const { categories, credits } = props.simpleReducer;

  return (
    <Container>
      <Chart>
        <StyledCategoryLimitWithButton1
          title="Cars"
          count={categories.cars.currentCount}
          limit={1}
          clickHandler={() => props.insertAd("cars")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Property"
          count={categories.properties.currentCount}
          limit={1}
          clickHandler={() => props.insertAd("properties")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Jobs"
          count={categories.jobs.currentCount}
          limit={1}
          clickHandler={() => props.insertAd("jobs")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Mobile Phones"
          count={categories.mobilePhones.currentCount}
          limit={1}
          clickHandler={() => props.insertAd("mobilePhones")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Everything else"
          count={categories.everythingElse.currentCount}
          limit={1}
          clickHandler={() => props.insertAd("everythingElse")}
          credits={credits}
        />
      </Chart>
      <InsertAd>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={() => props.insertCarAd()}
        >
          Insert Ad
        </Button>
        <Credits>
          {credits} Credits
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={() => props.buyCredits()}
          >
            Buy Credits
          </Button>
        </Credits>
      </InsertAd>
      <Manage>All your edit ad goes here</Manage>
    </Container>
  );
};

const mapStateToProps = state => ({
  ...state
});

// const mapDispatchToProps = dispatch => ({ dispatch });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      insertCarAd: insertCarAd,
      buyCredits: buyCredits,
      insertAd: insertAd
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

// export default Dashboard;
