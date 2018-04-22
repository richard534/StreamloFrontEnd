import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/custom.css"; // Importing custom css after bootstrap is important!
import "../node_modules/toastr/toastr.css";

render(<Router history={browserHistory} routes={routes} />, document.getElementById("app"));
