import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { chooseStoreType } from "./actions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Picker = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  height: 60vh;
  width: 40vw;
`;

const Plan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  grid-column-start: ${props => props.position};
`;

const CarStore = ({ chooseStoreType }) => (
  <Container>
    <Picker>
      <Plan position={1}>
        <div>Basic</div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px" }}
          onClick={() => chooseStoreType("basic")}
        >
          Choose
        </Button>
      </Plan>
      <Plan position={2}>
        <div>Plus</div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px" }}
          onClick={() => chooseStoreType("plus")}
        >
          Choose
        </Button>
      </Plan>
      <Plan position={3}>
        <div>Premium</div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px" }}
          onClick={() => chooseStoreType("premium")}
        >
          Choose
        </Button>
      </Plan>
    </Picker>
  </Container>
);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      chooseStoreType
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(CarStore);
