import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Paper
      elevation={2}
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "300px",
        margin: "0 auto",
        marginTop: "200px"
      }}
    >
      <Typography variant="h5" component="h3">
        Login
      </Typography>
      <TextField id="email" label="Email" margin="normal" variant="outlined" />
      <TextField
        id="password"
        label="Password"
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Login
      </Button>
    </Paper>
  );
}

export default App;
