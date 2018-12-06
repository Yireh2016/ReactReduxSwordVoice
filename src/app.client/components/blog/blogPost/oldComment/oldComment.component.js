import React from "react";
import "./oldComment.css";

const OldComment = props => {
	return (
		<div className="oldCommentsLayout fila">
			<div className="fila">
				<div>
					<div className="col-12 grid oldAvatarCont">
						<div>
							<div
								className="oldAvatarImg avatarImg"
								style={{
									backgroundImage: "url(" + props.userAvatar + ")"
								}}
							/>
						</div>
						<p>
							<span className="userName">{props.userName} </span>
							<br />
							<span>wrote:</span>
						</p>
					</div>
					<div className="col-12 grid">
						<p>{props.comments}</p>
					</div>
					<div className="postDateCont">
						<span className="postDate">{props.date}</span>
					</div>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default OldComment;
