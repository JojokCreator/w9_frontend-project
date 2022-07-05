import React from "react";
import LittleGreenButton from "../Button/LittleGreenButtonIndex";
import LittleRedButton from "../Button/LittleRedButtonindex";
import FormInput from "../InputTypeText/Input-Index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const ProfilePage = ({ id }) => {
	const [inputValue, setInputValue] = useState([{}]);
	const [isDisabled, setIsDisabled] = useState("none");
	const [isDisabledText, setIsDisabledText] = useState("#e0e0e2");
	const [userDetails, setUserDetails] = useState({});
	const [createEventError, setCreateEventError] = useState();

	const navigate = useNavigate();

	//Event listener for the input field
	function handleChange(event) {
		setInputValue({
			...inputValue,
			[event.target.name]: event.target.value,
		});
	}

	//Toggle function to expand the event cards
	function toggleDisable() {
		isDisabled === "none" ? setIsDisabled(true) : setIsDisabled("none");
		isDisabledText === "#e0e0e2"
			? setIsDisabledText("var(--primary-blue)")
			: setIsDisabledText("#e0e0e2");
	}
	//Fetches the user details to be used in the form
	async function fetchUserDetails() {
		const res = await fetch(`${process.env.REACT_APP_URL}/users/` + id, {
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			credentials: "include",
		});
		const response = await res.json();
		return response;
	}

	//Runs the functions on load to get the data and state
	useEffect(() => {
		async function getApiAndSetState() {
			let data = await fetchUserDetails();
			setUserDetails(data.Payload);
		}
		getApiAndSetState();
	}, []);

	//Submits the patch request to change the data
	async function submitUser() {
		(async () => {
			const response = await fetch(`${process.env.REACT_APP_URL}/users/` + id, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name: inputValue.first_name,
					last_name: inputValue.last_name,
					email: inputValue.email,
					password: inputValue.password,
					house_number: inputValue.house_number,
					street_address: inputValue.street_address,
					town: inputValue.town,
					region: inputValue.region,
					postcode: inputValue.postcode,
				}),
			});
			const content = await response.json();
			if (content.error) {
				setCreateEventError(content.error);
				return;
			} else if (content.Success === true) {
				navigate("/");
			}
		})();
	}
	//logs the user out (Deletes the token)
	async function deleteToken() {
		const res = await fetch(`${process.env.REACT_APP_URL}/refresh_token`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			credentials: "include",
		});
		navigate("/");
		window.location.reload(false);
		return await res.json();
	}
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
						navigate("/mainPage");
					}}
				>
					{/* Displays the users' id or "G" at the top right if not logged in*/}
					{id === 0 ? "G" : id}
				</p>
			</header>

			<br></br>
			<div className="login-inputs">
				<h1 className="h1-styling">My Profile</h1>
				<div className="profile-page-button-and-icon-spacing">
					<LittleRedButton
						handleClick={toggleDisable}
						className="little-red-button"
						buttonText={"Edit Profile"}
					/>
				</div>

				<p className="create-account-styling">First Name:</p>
				<FormInput
					handleChange={handleChange}
					name="first_name"
					placeholder="Enter your First Name"
					default={userDetails && userDetails[0] && userDetails[0].first_name}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<p className="create-account-styling">Surname:</p>
				<FormInput
					handleChange={handleChange}
					name="last_name"
					placeholder="Enter your Surname"
					default={userDetails && userDetails[0] && userDetails[0].last_name}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<p className="create-account-styling">Username:</p>
				<FormInput
					handleChange={handleChange}
					name="email"
					placeholder="Enter your Username"
					required="required"
					default={userDetails && userDetails[0] && userDetails[0].email}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<p className="create-account-styling">Change Password:</p>
				<FormInput
					inputType="password"
					handleChange={handleChange}
					name="password"
					placeholder="Enter a New Password"
					default={""}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<p className="create-account-styling">Address:</p>
				<FormInput
					handleChange={handleChange}
					name="house_number"
					placeholder="House/Flat Name or Number"
					default={userDetails && userDetails[0] && userDetails[0].house_number}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<br></br>
				<FormInput
					handleChange={handleChange}
					name="street_address"
					placeholder="Street Address"
					default={
						userDetails && userDetails[0] && userDetails[0].street_address
					}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<br></br>
				<FormInput
					handleChange={handleChange}
					name="town"
					placeholder="Town/City"
					default={userDetails && userDetails[0] && userDetails[0].town}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<br></br>
				<FormInput
					handleChange={handleChange}
					name="region"
					placeholder="Region"
					default={userDetails && userDetails[0] && userDetails[0].region}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<br></br>
				<FormInput
					handleChange={handleChange}
					name="postcode"
					placeholder="Postcode"
					default={userDetails && userDetails[0] && userDetails[0].postcode}
					disabled={isDisabled}
					isDisabledText={isDisabledText}
				/>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<LittleGreenButton
					handleClick={submitUser}
					className="little-green-button"
					buttonText={"Save Changes"}
				/>
				<br></br>
				<br></br>
				<br></br>
				<h1 className="login-error-message">{createEventError}</h1>
				<br></br>

				<LittleRedButton
					handleClick={deleteToken}
					className="little-red-button"
					buttonText={"Log Out"}
				/>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
		</div>
	);
};

export default ProfilePage;
