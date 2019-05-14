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
import { toastr } from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import Edit from "./Edit";

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

const Profile = styled.div`
  grid-row-start: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
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

const ToastrContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Badge = styled.div`
  background-color: ${props =>
    props.visibleToMeOnly ? "palevioletred" : "cadetblue"};
  border-radius: 10px;
  padding: 3px 10px;
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
        style={{ margin: "20px" }}
        disabled={!props.isNextFreeAdPostable}
        onClick={props.insertFreeAd}
      >
        Insert Free Ad
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!props.isNextPaidAdPostable}
        style={{ margin: "20px" }}
        onClick={props.insertPaidAd}
      >
        Insert Paid Ad
      </Button>
    </div>
  );
};

const StyledCategoryLimitWithButton1 = styled(CategoryLimitWithButton1)`
  display: flex;
  flex-direction: row;
`;

const Dashboard = props => {
  const { categories, credits, me } = props.simpleReducer;
  const { history } = props;

  const toastrOptions = {
    timeOut: 3000, // by setting to 0 it will prevent the auto close,
    component: (
      <ToastrContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/carstore")}
        >
          Verify
        </Button>
      </ToastrContainer>
    )
  };

  return (
    <Container>
      <Chart>
        <StyledCategoryLimitWithButton1
          title="Cars"
          count={categories.cars.currentCount}
          limit={1}
          isNextPaidAdPostable={categories.cars.isNextPaidAdPostable}
          isNextFreeAdPostable={categories.cars.isNextFreeAdPostable}
          insertPaidAd={
            !me.isCarVerified
              ? () =>
                  toastr.warning(
                    "",
                    "You need to verify before you can insert a car ad",
                    toastrOptions
                  )
              : () => props.insertPaidAd("cars")
          }
          insertFreeAd={() => props.insertFreeAd("cars")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Property"
          count={categories.properties.currentCount}
          limit={1}
          isNextPaidAdPostable={categories.properties.isNextPaidAdPostable}
          isNextFreeAdPostable={categories.properties.isNextFreeAdPostable}
          insertPaidAd={() => props.insertPaidAd("properties")}
          insertFreeAd={() => props.insertFreeAd("properties")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Jobs"
          count={categories.jobs.currentCount}
          limit={1}
          isNextPaidAdPostable={categories.jobs.isNextPaidAdPostable}
          isNextFreeAdPostable={categories.jobs.isNextFreeAdPostable}
          insertPaidAd={() => props.insertPaidAd("jobs")}
          insertFreeAd={() => props.insertFreeAd("jobs")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Mobile Phones"
          count={categories.mobilePhones.currentCount}
          limit={1}
          isNextPaidAdPostable={categories.mobilePhones.isNextPaidAdPostable}
          isNextFreeAdPostable={categories.mobilePhones.isNextFreeAdPostable}
          insertPaidAd={() => props.insertPaidAd("mobilePhones")}
          insertFreeAd={() => props.insertFreeAd("mobilePhones")}
          credits={credits}
        />
        <StyledCategoryLimitWithButton1
          title="Everything else"
          count={categories.everythingElse.currentCount}
          limit={1}
          isNextPaidAdPostable={categories.everythingElse.isNextPaidAdPostable}
          isNextFreeAdPostable={categories.everythingElse.isNextFreeAdPostable}
          insertPaidAd={() => props.insertPaidAd("everythingElse")}
          insertFreeAd={() => props.insertFreeAd("everythingElse")}
          credits={credits}
        />
      </Chart>
      <InsertAd>
        <Profile>
          <div>Kamal</div>
          {me.isCarVerified ? (
            <>
              <Badge>Car verified</Badge>
              <Badge visibleToMeOnly>{me.carStoreType}</Badge>
            </>
          ) : (
            ""
          )}
        </Profile>
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
