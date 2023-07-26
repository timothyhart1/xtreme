import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";

const PageHeader = (props) => {
	return <h4 className="my-page-header">{props.header}</h4>;
};

export default PageHeader;
