# Development

### Link to Deployed Website
[https://hungrypanda140.github.io/cs1300-development/](https://hungrypanda140.github.io/cs1300-development/)

### Goal and Value of the Application
The goal of this application is to create a straightforward interface that allows users to create playlists from a set of 12 different songs. The user has the ability to browse all 12 songs or filter and sort these songs by various important criteria such as the song's popularity (determined by the number of Spotify streams it has), genre, duration, etc. Once the user adds songs to their playlist, they are able to actually play these songs via Spotify's embed track functionality. 

The value of this application is that it streamlines the process of creating playlists from a set of songs that fit the user's criteria because of its filtering and sorting ability.  

### Usability Principles Considered
- In terms of the overall layout, I chose to create a clear hierarchy between the main section for filtering, sorting, and viewing the songs and the playlist/aggregator section. This was achieved through the inclusion of a clear vertical divider line between the two sections and the choice to give the sections equal height on the screen to establish their equality in the visual hierarchy.
- Diving into the main section, I broke this section down into the header section (which is located in the upper left corner to adhere to users' mental model of where an app's logo and title should be), a distinct sorting and filtering menu on the left side so users are immediately (natural left-to-right scanning order) shown that they have the ability to manipulate the songs card grid, and the equally spaced songs card grid.
- In the sorting and filtering section, I made sure that the headers for each form section had larger fonts and heavier weights to stress their role as headers. The sorts are radio buttons since radio buttons are used when we always want to have one and only one option selected, while the filters are checkboxes since checkboxes denote the ability for multiple selections or no selections at all.
- The song card component also adheres to some key usability principles related to larger font sizes and heavier weights for the song's title and heavier weights for the name's of different song properties (Artist, Album, Genre, etc.). I also made the button on this card alternate between white and black color schemes to provide high contrast with the red background of the card's body.
- Finally, the playlist section's layout is vertical and the songs are rendered as uniform numbered list items. All of these choices also adhere to users' mental model of what a playlist interface looks like.

### Organization of Components
- `App.js` is the overall component which contains all of the other main components (`HeaderSection.js`, `SortsAndFiltersSection.js`, songs card grid made up of `SongItem.js`, and `PlaylistSection.js`). It also contains all of the app's state and many helper functions that are passed down as props.
- `HeaderSection.js` is a component that renders the top bar of the app that lies above the main section where the filtering, sorting, and card grid are located. This component only has the Playlist Pal logo and header text.
- `SortsAndFiltersSection.js` is a component that renders the filtering and sorting menu with radio button and checkbox form inputs (using React Bootstrap's Form). These are all controlled components, meaning they are controlled by state values located in `App.js`.
- The songs card grid (using React Bootstrap's Row & Col grid system) is a grid of `SongItem.js` components, which are individual React Bootstrap Cards displaying each song's cover art, title, artist, album, duration, genre, number of streams, and a button to add or remove it from the playlist.
- `PlaylistSection.js` is a component that renders the section on the right side of the screen. It displays the total number of songs in the playlist, the total duration of the playlist (which is the aggregator), as well as Spotify embeds for each song in the playlist that allow users to actually listen to the songs in the browser.

### How Data is Passed Down Through Components
`App.js` contains all of the state variables and data for the app and then passes it down as props to the different child components:
- `SortsAndFiltersSection.js` receives JavaScript Set objects `selectedSort`, `selectedGenres`, and `selectedReleaseTypes` as well as some callback functions for any changes to these sorts and filters.
- `SongItem.js` receives a JavaScript `song` object which is mapped from `songs-data.json` as well as the `playlist` JavaScript object and its corresponding `setPlaylist` setter function. The `song` object contains all of the necessary properties and info to display for each song and `playlist` + `setPlaylist` are used to handle adding songs to the playlist.
- `PlaylistSection.js` just takes in the `playlist` JavaScript object to use for rendering all of the songs via the `song.embed` property.

### How the User Triggers State Changes
The primary state changes occur in `SortsAndFiltersSection.js` and `SongItem.js`:
- `SortsAndFilters.js` fires various callback functions that it receives as props from `App.js`. These callback functions handle the important logic of updating the state values for which sorts and filters are selected. There is some added complexity with this due to the inclusion of "All" as a category for the filters, which leads to some extra logic for unchecking "All" when any other individual checkbox is selected and unchecking all other checkboxes when "All" is clicked.
- `SongItem.js` triggers state changes to the `playlist` object whenever the user clicks the "Add to Playlist" or "Remove from Playlist" button to toggle the song's membership in the playlist.
