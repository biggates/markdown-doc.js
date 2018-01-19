import React from "react";
import { render } from "react-dom";

import MarkdownComponent from "./markdown.jsx";

import "./assets/styles/style.scss";

import doc from "../doc/document.md";

render(<MarkdownComponent text={doc} />, document.getElementById("root"));
