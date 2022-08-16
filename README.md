
# Bootcamper Social.

This is the Front End of our Mid-way project for School of Code, we were presented with the task of creating an app that would help a bootcamper through this experience. After some discussion we decided to create an APP centered around meeting other bootcampers outside of Bootcamp Hours.

App is deployed [here](https://front-end-bootcamper-social.netlify.app/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/SchoolOfCode/w9_frontend-project-joe-klakus-the-wailers.git
```

Go to the project directory

```bash
  cd my-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

For back end follow this link: https://github.com/SchoolOfCode/w9_backend-project-joe-klakus-the-wailers

### Built with
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- Javascript
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Media queries
- Conditional Rendering

## Features

Working Features
- Login
- Guest login
- Create account
- Create event
- Logout (By clicking profile icon)
- Expand events on main page
- Filters work.


### What I learned

- **How to determine distance using maths and Javascript**
```bash
	//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
	function calcCrow(lat1, lon1, lat2, lon2) {
		var R = 6371; // km
		var dLat = toRad(lat2 - lat1);
		var dLon = toRad(lon2 - lon1);
		lat1 = toRad(lat1);
		lat2 = toRad(lat2);

		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d;
	}
 ```
 - **How filter using a sorting table**
 ```bash
 	//sorts the data using a sorting table linked to the filters dropdown
	//Currently the sort by location does not have a function TODO
	const sortArray = (type) => {
		const types = {
			name_of_event: "name_of_event",
			name_of_event_host: "name_of_event_host",
			start_time: "start_time",
			end_time: "end_time",
			distance: "distance",
		};
		const sortProperty = types[type];
		const sorted = [...data].sort((a, b) => {
			if (sortProperty === "name_of_event") {
				return a.name_of_event.localeCompare(b.name_of_event);
			} else if (sortProperty === "name_of_event_host") {
				return a.name_of_event_host.localeCompare(b.name_of_event_host);
			} else if (sortProperty === "distance") {
				return a[sortProperty] - b[sortProperty];
			} else {
				return Date.parse(a[sortProperty]) - Date.parse(b[sortProperty]);
			}
		});
		setEvents(sorted);
	};
 ```

## Color Reference - All CSS is in App.css

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| --primary-blue | ![#003049](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| --primary-green | ![#0b6e4f](https://via.placeholder.com/10/0b6e4f?text=+) #0b6e4f |
| --primary-orange | ![#fa9f42](https://via.placeholder.com/10/fa9f42?text=+) #fa9f42 |
| --primary-red | ![#d62828](https://via.placeholder.com/10/d62828?text=+) #00d1a0 |
| --secondary-red | ![#7a1616](https://via.placeholder.com/10/7a1616?text=+) #00d1a0 |
| --primary-grey | ![#e0e0e2](https://via.placeholder.com/10/e0e0e2?text=+) #00d1a0 |


### Continued development
- [ ] Loading Spinners
- [ ] Pagination + Infinite Scroll 
- [ ] Code Refactoring

## Authors

- [@Plume93](https://github.com/Plume93)
- [@JojokCreator](https://github.com/JojokCreator)
- [@Musy88](https://github.com/Musy88)
- [@danielknight261](https://github.com/danielknight261)

