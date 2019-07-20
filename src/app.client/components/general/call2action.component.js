import React from "react";
import "./call2Action.css";

const Call2Action = props => {
	return (
		<React.Fragment>
			<a aria-label="go to contact us page" href="/contact">
				<button className={"call2Action " + props.className} type="button">
					Contact Us
				</button>
			</a>
		</React.Fragment>
	);
};

export default Call2Action;

