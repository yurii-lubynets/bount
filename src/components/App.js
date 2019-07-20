import React, { PureComponent } from "react";
import Routes from "../routes";
import Chat from "./Chat";

class App extends PureComponent {
  render() {
    return (
      <div>
        <Routes />
        <Chat />
      </div>
    )
  }
}

export default App;
