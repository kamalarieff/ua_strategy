import React from "react";
import Icon from "@mdi/react";
import {
  mdiCarSide,
  mdiHome,
  mdiAccountTie,
  mdiCellphoneIphone
} from "@mdi/js";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  grid-row-start: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Profile = ({ me, categories }) => (
  <Container>
    <div>Kamal</div>
    {categories.cars.isProfileActivated && (
      <BadgeContainer>
        <Icon path={mdiCarSide} size={1} style={{ marginRight: "10px" }} />
        <span>Car profile activated</span>
      </BadgeContainer>
    )}
    {categories.properties.isProfileActivated && (
      <BadgeContainer>
        <Icon path={mdiHome} size={1} style={{ marginRight: "10px" }} />
        <span>Properties profile activated</span>
      </BadgeContainer>
    )}
    {categories.jobs.isProfileActivated && (
      <BadgeContainer>
        <Icon path={mdiAccountTie} size={1} style={{ marginRight: "10px" }} />
        <span>Jobs profile activated</span>
      </BadgeContainer>
    )}
    {categories.mobilePhones.isProfileActivated && (
      <BadgeContainer>
        <Icon
          path={mdiCellphoneIphone}
          size={1}
          style={{ marginRight: "10px" }}
        />
        <span>Mobile Phones profile activated</span>
      </BadgeContainer>
    )}
  </Container>
);

const mapStateToProps = state => ({
  me: state.simpleReducer.me,
  categories: state.simpleReducer.categories
});

export default connect(
  mapStateToProps,
  null
)(Profile);
