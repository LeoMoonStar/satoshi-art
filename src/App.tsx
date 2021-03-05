import React, { StrictMode } from "react";
import TextField from "@material-ui/core/TextField";
import "./App.css";

function App(): JSX.Element {
  return (
    <StrictMode>
      <div className="App">
        <form className="App-header">
          <TextField id="standard-basic" label="Standard" />
        </form>
      </div>
    </StrictMode>
  );
}

export default App;
