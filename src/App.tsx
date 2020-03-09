import * as React from "react";
import "./styles.css";
import { EasyList } from "./EasyList";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      }}
    >
      <EasyList aheadCount={5}>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <h2>Start editing to see some magic happen!</h2>
      </EasyList>
    </div>
  );
}
