import React from "react";
import GreenButton from "../Button/GreenButtonIndex";
import FormInput from "../InputTypeText/Input-Index";
import EventCard from "../EventCard/EventCard";
import MainPageMap from "../Map/MainPageMap.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ({ id, token }) => {
	const [events, setEvents] = useState([]);
	const [data, setData] = useState([]);
	const [sortType, setSortType] = useState([]);
	const navigate = useNavigate();

  //Sets up the filter based on the search input
	function handleChange(event) {
		const search = event.target.value.toLowerCase();
		const filtered = data.filter((events) =>
			events.name_of_event.toLowerCase().includes(search) ||
      events.region.toLowerCase().includes(search) ||
      events.name_of_event_host.toLowerCase().includes(search)
		);
		setEvents(filtered);
	}
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

	// Converts numeric degrees to radians
	function toRad(Value) {
		return (Value * Math.PI) / 180;
	}

	//gets the events
	async function fetchData() {
		const res = await fetch("http://localhost:5000/events", {
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			credentials: "include",
		});

		return await res.json();
	}

	//Distance
	function getDistance(fetchedData) {
		navigator.geolocation.getCurrentPosition((position) => {
			const pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			const newArray = fetchedData.Payload.map((x) => ({
				...x,
				distance: calcCrow(x.lat, x.long, pos.lat, pos.lng),
			}));
			setData(newArray);
		});
	}
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

  //Gets the events data on page load and words out the distances
	useEffect(() => {
		async function GetData() {
			const fetchedData = await fetchData();
			getDistance(fetchedData);
		}

		GetData();
	}, []);

  //Sets up the sorting table on page load
	useEffect(() => {
		sortArray(sortType);
	}, [data, sortType]);

	return (
		<div>
			<header className="header">
				<img
					className="our-logo"
					src="/mainLogo.png"
					alt="Bootcamper Social Logo"
				/>
				<p
					className="profile-icon"
					onClick={() => {
						navigate("/updateUserPage");
					}}
				>
					{id === 0 ? "G" : id}
				</p>
			</header>

			<p className="search-bar-label">Search By Event, Host or Region</p>
			<FormInput
				handleChange={handleChange}
				name="username-input"
				placeholder="Search Here"
			/>
			<br></br>
			<br></br>
			<div id="map">{events && <MainPageMap events={events} />}</div>
			<br></br>
			<br></br>
			{token ? (
				<Link to="/newEventPage">
					<GreenButton className="green-button" buttonText={"Add an Event"} />
				</Link>
			) : (
				""
			)}
			<br></br>

			<div>
				{/*Renders the filter menu*/}
				<div className="dropdown">
					<select
						onChange={(e) => setSortType(e.target.value)}
						className="drop-down-styling"
					>
						<option value="start_time">Date (Start Time)</option>
						<option value="end_time">Date (End Time)</option>
						<option value="name_of_event_host">Organizer</option>
						<option value="distance">Distance</option>
						<option value="name_of_event">Name of Event</option>
					</select>
				</div>
			</div>
			{/*Renders the events list*/}

			<ul className="event-list-main-page">
				{events &&
					events.map((event) => (
						<li key={event.events_id} className="expanded-event-container">
							<EventCard
								img={event.img_url}
								name_of_event={event.name_of_event}
								cost={event.cost}
								description={event.description}
								end_time={event.end_time}
								event_host={event.event_host}
								name_of_event_host={event.name_of_event_host}
								events_id={event.events_id}
								house_number={event.house_number}
								lat={event.lat}
								long={event.long}
								postcode={event.postcode}
								region={event.region}
								start_time={event.start_time}
								street_address={event.street_address}
								town={event.town}
								distance={event.distance}
							/>
						</li>
					))}
			</ul>
		</div>
	);
};

export default MainPage;
