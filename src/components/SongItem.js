import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { FiClock } from "react-icons/fi";

// Component that represents an individual song card in the grid. Citation: I used Spotify's "Embed Track" feature
// to render the embedded songs via <iframe/>s in the playlist compoennt
function SongItem(props) {
	const { song, playlist, setPlaylist } = props;

	const inPlaylist = song.id in playlist;

	// Toggles a song's membership in the playlist
	const togglePlaylistMembership = () => {
		// If the song is in the playlist, delete the song from the playlist and then update
		if (inPlaylist) {
			const newPlaylist = {
				...playlist,
			};
			delete newPlaylist[song.id];
			setPlaylist(newPlaylist);
		} else {
			// Otherwise, add the song to the playlist and also add a date_added field to preserve the correct
			// order when rendering the songs in the playlist
			const newPlaylist = {
				...playlist,
				[song.id]: { ...song, date_added: new Date() },
			};
			setPlaylist(newPlaylist);
		}
	};

	return (
		<Col>
			<Card>
				<Card.Img src={song.image} />
				<Card.Body className="d-flex flex-column">
					<Card.Title className="fw-bold">{song.title}</Card.Title>
					<Card.Text>
						<b>Artist: </b>
						{song.artist}
					</Card.Text>
					<Card.Text>
						<b>Album: </b>
						{song.album}
					</Card.Text>
					<Card.Text>
						<b>Genre: </b>
						{song.genre.join(", ")}
					</Card.Text>
					<Card.Text>
						<b>Release Type: </b>
						{song.release_type}
					</Card.Text>
					<Card.Text>
						<b>Spotify Streams: </b>
						{song.spotify_streams.toLocaleString()}
					</Card.Text>
					<div className="d-flex justify-content-between align-items-center mt-auto">
						<div className="d-flex align-items-center gap-1 mt-4">
							<FiClock style={{ marginTop: "2px" }} />
							<span>{song.duration_string}</span>
						</div>
						<Button
							variant={inPlaylist ? "dark" : "light"}
							className="btn-sm ms-auto mt-4"
							onClick={togglePlaylistMembership}
						>
							{inPlaylist
								? "Remove from Playlist"
								: "Add to Playlist"}
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default SongItem;
