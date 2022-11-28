import React from "react";
import { Image } from "react-bootstrap";

function HeaderSection() {
	return (
		<div className="d-flex align-items-center py-3 px-4 gap-1">
			{/* Citation: This 3D logo was found at this link: https://www.figma.com/community/file/1030350068466019692 */}
			<Image
				className="header-img"
				src="images/logo.png"
				alt="Playlist Pal logo"
			/>
			<span className="header-title">Playlist Pal</span>
		</div>
	);
}

export default HeaderSection;
