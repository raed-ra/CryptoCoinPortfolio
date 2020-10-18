// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";


// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

// import * as serviceWorker from './serviceWorker';
import registerServiceWorker from "./registerServiceWorker";
ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
