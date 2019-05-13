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

const CarStore = props => {
  const { chooseStoreType, history } = props;

  return (
    <Container>
      <Picker>
        <Plan position={1}>
          <div>Basic</div>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "20px" }}
            onClick={() => {
              chooseStoreType("basic");
              history.push("/dashboard");
            }}
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
            onClick={() => {
              chooseStoreType("plus");
              history.push("/dashboard");
            }}
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
            onClick={() => {
              chooseStoreType("premium");
              history.push("/dashboard");
            }}
          >
            Choose
          </Button>
        </Plan>
      </Picker>
    </Container>
  );
};

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
