import React, { useState } from "react";
import "./App.css";
import songsData from "./assets/songs-data.json";
import SongItem from "./components/SongItem";
import SortsAndFiltersSection from "./components/SortsAndFiltersSection";
import PlaylistSection from "./components/PlaylistSection";
import { Image, Row, Col } from "react-bootstrap";

function App() {
	const [playlist, setPlaylist] = useState({});
	const [selectedSort, setSelectedSort] = useState("Popular: Most Streams");
	const [selectedGenres, setSelectedGenres] = useState(new Set(["All"]));
	const [selectedReleaseTypes, setSelectedReleaseTypes] = useState(
		new Set(["All"])
	);

	const onSelectSort = (e) => {
		// The sort option that was selected can be found via the event target's ID
		const sort = e.target.id;
		// Set the sort option that was selected since the checkbox is controlled
		setSelectedSort(sort);
	};

	// Generic function that is called when the user selects some filter option
	// from a checkbox. This is used for both selecting genres and release types
	const onSelectFilter = (
		selectedFilter,
		selectedFilters,
		setSelectedFilter
	) => {
		// If the filter is alreadu selected, remove it
		if (selectedFilters.has(selectedFilter)) {
			setSelectedFilter(
				(prev) =>
					new Set(
						[...prev].filter((filter) => filter !== selectedFilter)
					)
			);
		} else {
			// If the "All" option was selected, uncheck all other filters
			// and only check "All"
			if (selectedFilter === "All") {
				setSelectedFilter(new Set(["All"]));
			} else {
				// If a different option was checked, first uncheck "All" if it
				// was selected before checking the new filter
				setSelectedFilter((prev) => {
					if (prev.has("All")) {
						prev.delete("All");
					}
					return new Set(prev.add(selectedFilter));
				});
			}
		}
	};

	// Callback function that runs when a genre checkbox is selected
	const onSelectGenre = (e) => {
		// The genre option that was selected can be found via the event target's ID
		const selectedGenre = e.target.id;
		onSelectFilter(selectedGenre, selectedGenres, setSelectedGenres);
	};

	// Callback function that runs when a release type checkbox is selected
	const onSelectReleaseType = (e) => {
		// The release type option that was selected can be found via the event target's ID
		const selectedReleaseType = e.target.id;
		onSelectFilter(
			selectedReleaseType,
			selectedReleaseTypes,
			setSelectedReleaseTypes
		);
	};

	// Function that returns different sort functions depending on which sort option is selected
	const fetchSortFunction = () => {
		if (selectedSort === "Popular: Most Streams") {
			// Sort using the spotify_streams property
			return (a, b) => b.spotify_streams - a.spotify_streams;
		} else if (selectedSort === "Duration: Shortest to Longest") {
			// Sort using the duration property, going shortest to longest
			return (a, b) => a.duration - b.duration;
		} else if (selectedSort === "Duration: Longest to Shortest") {
			// Sort using the duration property, going longest to shortest
			return (a, b) => b.duration - a.duration;
		}
		return (a, b) => a - b;
	};

	// Helper function that checks if a song satisfies a filter by checking
	// if all of the filter values are present in the song's relevant property
	const songSatisfiesFilters = (song, filters) =>
		filters.size > 0 && [...filters].every((value) => song.has(value));

	// Generic function that takes in a song's property as a set and the
	// set of selected filters to compare the property to
	const filterByProperty = (songPropertyAsSet, selectedFilters) => {
		if (selectedFilters.has("All")) {
			return true;
		} else if (songSatisfiesFilters(songPropertyAsSet, selectedFilters)) {
			return true;
		} else {
			return false;
		}
	};

	// Filters the songs by genre, release type, and then sorts them using the
	// relevant sorting function before passing to the component to be rendered
	const filteredAndSortedSongs = songsData
		.filter((song) => filterByProperty(new Set(song.genre), selectedGenres))
		.filter((song) =>
			filterByProperty(new Set([song.release_type]), selectedReleaseTypes)
		)
		.sort(fetchSortFunction());

	return (
		<div className="App d-flex">
			<div className="main-container p-2">
				<div className="d-flex align-items-center py-3 px-4 gap-1">
					{/* Citation: This 3D logo was found at this link: https://www.figma.com/community/file/1030350068466019692 */}
					<Image
						className="header-img"
						src="images/logo.png"
						alt="Playlist Pal logo"
					/>
					<span className="header-title">Playlist Pal</span>
				</div>
				<Row>
					<Col
						xs={3}
						className="d-flex flex-column mt-4 ms-4 py-3 px-4 filter-container"
					>
						<SortsAndFiltersSection
							selectedSort={selectedSort}
							onSelectSort={onSelectSort}
							selectedGenres={selectedGenres}
							onSelectGenre={onSelectGenre}
							selectedReleaseTypes={selectedReleaseTypes}
							onSelectReleaseType={onSelectReleaseType}
						/>
					</Col>
					<Col>
						<Row
							xs={1}
							sm={1}
							md={2}
							lg={2}
							xlg={3}
							className="p-4 gy-4"
						>
							{filteredAndSortedSongs.map((song) => (
								<SongItem
									key={song.id}
									song={song}
									playlist={playlist}
									setPlaylist={setPlaylist}
								/>
							))}
						</Row>
					</Col>
				</Row>
			</div>
			<PlaylistSection playlist={playlist} />
		</div>
	);
}

// Filter by: Genre: Hip-Hop, Pop, EDM, Indie, R&B Song Type: Single, Album track, EP track
// Sort by: Duration: Shortest to Longest, Duration: Longest to Shortest, Title: A to Z
// Add to Favorites Playlist -> Aggregator is Total Playlist Duration

export default App;
