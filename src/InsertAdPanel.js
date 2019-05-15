import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import { toastr } from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { insertFreeAd, insertPaidAd } from "./actions";

import Button from "@material-ui/core/Button";

const CategoryLimitWithButton1 = props => {
  return (
    <div className={props.className}>
      <h2>
        {props.title}: {props.count} {props.limit && `/ ${props.limit}`}
      </h2>
      {props.insertFreeAd && (
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px" }}
          disabled={!props.isNextFreeAdPostable}
          onClick={props.insertFreeAd}
        >
          Insert Free Ad
        </Button>
      )}
      {props.insertPaidAd && (
        <Button
          variant="contained"
          color="primary"
          disabled={!props.isNextPaidAdPostable}
          style={{ margin: "20px" }}
          onClick={props.insertPaidAd}
        >
          Insert Paid Ad
        </Button>
      )}
    </div>
  );
};

const StyledCategoryLimitWithButton1 = styled(CategoryLimitWithButton1)`
  display: flex;
  flex-direction: row;
`;

const ToastrContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const BasicInsertAdTab = ({ props }) => {
  const { categories, credits, me } = props.simpleReducer;

  return (
    <>
      <StyledCategoryLimitWithButton1
        title="Cars"
        count={categories.cars.freeAdsCount}
        limit={1}
        isNextFreeAdPostable={categories.cars.isNextFreeAdPostable}
        insertFreeAd={() => props.insertFreeAd("cars")}
        credits={credits}
      />
      <StyledCategoryLimitWithButton1
        title="Property"
        count={categories.properties.freeAdsCount}
        limit={1}
        isNextFreeAdPostable={categories.properties.isNextFreeAdPostable}
        insertFreeAd={() => props.insertFreeAd("properties")}
        credits={credits}
      />
      <StyledCategoryLimitWithButton1
        title="Jobs"
        count={categories.jobs.freeAdsCount}
        limit={1}
        isNextFreeAdPostable={categories.jobs.isNextFreeAdPostable}
        insertFreeAd={() => props.insertFreeAd("jobs")}
        credits={credits}
      />
      <StyledCategoryLimitWithButton1
        title="Mobile Phones"
        count={categories.mobilePhones.freeAdsCount}
        limit={1}
        isNextFreeAdPostable={categories.mobilePhones.isNextFreeAdPostable}
        insertFreeAd={() => props.insertFreeAd("mobilePhones")}
        credits={credits}
      />
      <StyledCategoryLimitWithButton1
        title="Everything else"
        count={categories.everythingElse.freeAdsCount}
        limit={1}
        isNextFreeAdPostable={categories.everythingElse.isNextFreeAdPostable}
        insertFreeAd={() => props.insertFreeAd("everythingElse")}
        credits={credits}
      />
    </>
  );
};

const CarInsertAdTab = ({ props }) => {
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

  const Badge = styled.div`
    display: inline-block;
    background-color: ${props =>
      props.visibleToMeOnly ? "palevioletred" : "cadetblue"};
    border-radius: 10px;
    padding: 3px 10px;
  `;

  return (
    <>
      {me.isCarVerified && (
        <>
          <Badge>Car verified</Badge>
          <Badge visibleToMeOnly>{me.carStoreType}</Badge>
        </>
      )}
      <StyledCategoryLimitWithButton1
        title="Cars"
        count={categories.cars.paidAdsCount}
        isNextPaidAdPostable={categories.cars.isNextPaidAdPostable}
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
        credits={credits}
      />
    </>
  );
};

const PropertyInsertAdTab = ({ props }) => {
  const { categories, credits, me } = props.simpleReducer;

  return (
    <StyledCategoryLimitWithButton1
      title="Properties"
      count={categories.properties.paidAdsCount}
      isNextPaidAdPostable={categories.properties.isNextPaidAdPostable}
      insertPaidAd={() => props.insertPaidAd("properties")}
      credits={credits}
    />
  );
};

const JobInsertAdTab = ({ props }) => {
  const { categories, credits, me } = props.simpleReducer;

  return (
    <StyledCategoryLimitWithButton1
      title="Jobs"
      count={categories.jobs.paidAdsCount}
      isNextPaidAdPostable={categories.jobs.isNextPaidAdPostable}
      insertPaidAd={() => props.insertPaidAd("jobs")}
      credits={credits}
    />
  );
};

const MobilePhoneInsertAdTab = ({ props }) => {
  const { categories, credits, me } = props.simpleReducer;

  return (
    <StyledCategoryLimitWithButton1
      title="Mobile Phones"
      count={categories.mobilePhones.paidAdsCount}
      isNextPaidAdPostable={categories.mobilePhones.isNextPaidAdPostable}
      insertPaidAd={() => props.insertPaidAd("mobilePhones")}
      credits={credits}
    />
  );
};

const InsertAdPanel = props => {
  return (
    <Tabs>
      <TabList>
        <Tab>Basic</Tab>
        <Tab>Cars</Tab>
        <Tab>Properties</Tab>
        <Tab>Jobs</Tab>
        <Tab>Mobile Phones</Tab>
      </TabList>

      <TabPanel>
        <h2>Basic</h2>
        <BasicInsertAdTab props={props} />
      </TabPanel>
      <TabPanel>
        <h2>Cars</h2>
        <CarInsertAdTab props={props} />
      </TabPanel>
      <TabPanel>
        <h2>Properties</h2>
        <PropertyInsertAdTab props={props} />
      </TabPanel>
      <TabPanel>
        <h2>Jobs</h2>
        <JobInsertAdTab props={props} />
      </TabPanel>
      <TabPanel>
        <h2>Mobile Phones</h2>
        <MobilePhoneInsertAdTab props={props} />
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      insertFreeAd,
      insertPaidAd
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertAdPanel);
