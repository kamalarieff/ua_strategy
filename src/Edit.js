import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import Ad from "./Ad";

const LockIcon = () => (
  <SvgIcon style={{ height: "10px", width: "10px", marginLeft: "2px" }}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </SvgIcon>
);

const Edit = ({ categories }) => {
  const temp = Object.keys(categories);
  const { cars, properties, jobs, mobilePhones, everythingElse } = categories;

  let FreeAds = [];
  let CarAds = [];
  let PropertyAds = [];
  let JobAds = [];
  let MobilePhoneAds = [];

  for (let value of temp) {
    if (categories[value].freeAdsCount > 0) {
      for (let index = 0; index < categories[value].freeAdsCount; index++) {
        FreeAds.push(<Ad title={value} key={`${value}-${index}`} />);
      }
    }
    if (value == "cars" && categories[value].isProfileActivated) {
      for (let index = 0; index < categories[value].paidAdsCount; index++) {
        CarAds.push(<Ad title={value} key={`${value}-${index}`} />);
      }
    }
    if (value == "properties" && categories[value].isProfileActivated) {
      for (let index = 0; index < categories[value].paidAdsCount; index++) {
        PropertyAds.push(<Ad title={value} key={`${value}-${index}`} />);
      }
    }
    if (value == "jobs" && categories[value].isProfileActivated) {
      for (let index = 0; index < categories[value].paidAdsCount; index++) {
        JobAds.push(<Ad title={value} key={`${value}-${index}`} />);
      }
    }
    if (value == "mobilePhones" && categories[value].isProfileActivated) {
      for (let index = 0; index < categories[value].paidAdsCount; index++) {
        MobilePhoneAds.push(<Ad title={value} key={`${value}-${index}`} />);
      }
    }
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Basic</Tab>
        <Tab disabled={!cars.isProfileActivated}>
          Cars{!cars.isProfileActivated ? <LockIcon /> : ""}
        </Tab>
        <Tab disabled={!properties.isProfileActivated}>
          Properties{!properties.isProfileActivated ? <LockIcon /> : ""}
        </Tab>
        <Tab disabled={!jobs.isProfileActivated}>
          Jobs{!jobs.isProfileActivated ? <LockIcon /> : ""}
        </Tab>
        <Tab disabled={!mobilePhones.isProfileActivated}>
          Mobile Phones{!mobilePhones.isProfileActivated ? <LockIcon /> : ""}
        </Tab>
      </TabList>

      <TabPanel>
        <h2>Basic</h2>
        {FreeAds}
      </TabPanel>
      <TabPanel>
        <h2>Cars</h2>
        {CarAds}
      </TabPanel>
      <TabPanel>
        <h2>Properties</h2>
        {PropertyAds}
      </TabPanel>
      <TabPanel>
        <h2>Jobs</h2>
        {JobAds}
      </TabPanel>
      <TabPanel>
        <h2>Mobile Phones</h2>
        {MobilePhoneAds}
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = state => ({
  categories: state.simpleReducer.categories
});

export default connect(
  mapStateToProps,
  null
)(Edit);
