import React from "react";
import { Form } from "react-bootstrap";

// The labels for the different form options in this section
const formLabels = {
	genres: ["All", "Hip-Hop", "EDM", "Pop", "R&B", "Indie"],
	release_types: ["All", "Album", "EP", "Single"],
	sorts: [
		"Popular: Most Streams",
		"Duration: Shortest to Longest",
		"Duration: Longest to Shortest",
	],
};

// This component is the sorting and filtering section on the left side of the screen
function SortsAndFiltersSection(props) {
	const {
		selectedSort,
		onSelectSort,
		selectedGenres,
		onSelectGenre,
		selectedReleaseTypes,
		onSelectReleaseType,
	} = props;

	return (
		<React.Fragment>
			<span className="fw-bold fs-5 mb-1">Sort By</span>
			<Form>
				{formLabels["sorts"].map((sort) => {
					return (
						<Form.Check
							key={sort}
							id={sort}
							type="radio"
							label={sort}
							checked={sort === selectedSort}
							onChange={onSelectSort}
							className="my-2"
						/>
					);
				})}
			</Form>
			<span className="fw-bold fs-5 my-1">Genre</span>
			<Form>
				{formLabels["genres"].map((genre) => {
					return (
						<Form.Check
							key={genre}
							id={genre}
							type="checkbox"
							label={genre}
							checked={selectedGenres.has(genre)}
							onChange={onSelectGenre}
							className="my-2"
						/>
					);
				})}
			</Form>
			<span className="fw-bold fs-5 my-1">Release Type</span>
			<Form>
				{formLabels["release_types"].map((type) => {
					return (
						<Form.Check
							key={type}
							id={type}
							type="checkbox"
							label={type}
							checked={selectedReleaseTypes.has(type)}
							onChange={onSelectReleaseType}
							className="my-2"
						/>
					);
				})}
			</Form>
		</React.Fragment>
	);
}

export default SortsAndFiltersSection;
