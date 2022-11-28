import React from "react";
import { ListGroup } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import convertHtmlToReact from "@hedgedoc/html-to-react";

// This component is the playlist section on the right side of the screen
function PlaylistSection(props) {
	const { playlist } = props;

	// This function converts seconds to time in MM:SS format. Citation: This function
	// was adapted from the following link, https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
	function secondsToTime(seconds) {
		const minAsString = Math.floor((seconds % 3600) / 60).toString();
		const secAsString = Math.floor(seconds % 60).toString();
		const m = minAsString.padStart(minAsString.length === 1 ? 1 : 2, "0"),
			s = secAsString.padStart(secAsString.length === 1 ? 1 : 2, "0");

		return m + " min, " + s + " sec";
	}

	return (
		<div className="playlist-container py-2">
			<div className="d-flex flex-column pt-2 pb-3 px-4 gap-1">
				<span className="header-title">My Playlist</span>
				<div className="d-flex align-items-center">
					<span>{`${Object.keys(playlist).length} ${
						Object.keys(playlist).length === 1 ? "song" : "songs"
					}`}</span>
					<GoPrimitiveDot className="dot-icon mx-1" />
					<span>{`${secondsToTime(
						Object.values(playlist).reduce(
							(prevTotalDuration, song) =>
								prevTotalDuration + song.duration,
							0
						)
					)}`}</span>
				</div>
			</div>
			<ListGroup as="ol" numbered className="pe-3">
				{Object.values(playlist)
					.sort((a, b) => a.date_added - b.date_added)
					.map((song) => (
						<ListGroup.Item
							key={song.id}
							as="li"
							className="d-flex align-items-center gap-2"
						>
							{convertHtmlToReact(song.embed)}
						</ListGroup.Item>
					))}
			</ListGroup>
		</div>
	);
}

export default PlaylistSection;
