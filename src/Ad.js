import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

export default ({ title }) => (
  <Container>
    {title}
    <ButtonsContainer>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        Edit
      </Button>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        Delete
      </Button>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        Copy
      </Button>
    </ButtonsContainer>
  </Container>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonsContainer = styled.div`
  grid-column-start: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
