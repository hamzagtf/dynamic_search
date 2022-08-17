import React, { useState, useEffect, useReducer } from "react";
import SearchInput from "./search-input.js";
import { Plus, Dash } from "react-bootstrap-icons";
import InsertDataInput from "./insert-data-input.js";
import "./styling.css";
export const reformDataFromServer = (data) => {
	const { controlData, value, date, id } = data;
	return {
		...controlData,
		id: String(controlData.id),
		controlDataId:id,
		value,
		date,
		state: "old",
	};
};
const initialState = { patientData: [], changesMade: false, dataToBeSaved: [] };
const reducer = (state, action) => {
	switch (action.type) {
		case "changesAreMade":
			return {
				...state,
				changesMade: action.payload.inputSate,
			};
		case "insertPreviousData":
			return {
				...state,
				patientData: action.payload.previousData,
			};
		case "updatePatientData":
			return {
				...state,
				patientData: [
					...state.patientData.filter(
						(i) => i.id !== action.payload.id
					),
					action.payload,
				],
			};
		case "removePatientData":
			return {
				...state,
				patientData: state.patientData.filter(
					(i) => i.id !== action.payload.id
				),
			};
		case "refresh":
			return {
				...state,
				patientData: state.patientData.map((i) => ({
					...i,
					state: i.state === "new" ? "old" : i.state,
				})),
			};

		case "clearDataToBeSaved":
			return { ...state, dataToBeSaved: [] };

		case "addDataToBeSaved":
			return {
				...state,
				dataToBeSaved: [
					...state.dataToBeSaved.filter(
						(i) => i.id !== action.payload.id
					),
					action.payload,
				],
			};

		case "removeFromDataToBeSaved":
			return {
				...state,
				dataToBeSaved: state.dataToBeSaved.filter(
					(i) => i.id !== action.payload.id
				),
			};
		default:
			throw new Error(
				"action type is not correct for the patient data !!"
			);
	}
};

const AddNewData = (props) => {
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (props.patientData) {
			dispatch({
				type: "insertPreviousData",
				payload: { previousData: props.patientData },
			});
		}
	}, [props.patientData]);

	const onDelete = (obj) => {
		dispatch({ type: "removePatientData", payload: { id: obj.id } });
		const deletedItem = { ...obj, state: "removed" };
		const dataToBeSavedCase =
			obj.state === "new"
				? "removeFromDataToBeSaved"
				: "addDataToBeSaved";
		dispatch({ type: dataToBeSavedCase, payload: deletedItem });
	};
	const saveData = () => {
		// data to save it on the server
		// prepare data for the backend
		//in the following cases:
		//1- old data is changed
		//2- new data is inserted
		//3- old data is  deleted
		// return an array of objects else return empty array

		props.onSave(state.dataToBeSaved);
		console.log(state.dataToBeSaved);
		dispatch({ type: "clearDataToBeSaved", payload: [] });
		dispatch({ type: "refresh", payload: [] });
	};
	const handleInputRequest = (obj) => {
		// to add new input to the dom
		// to add inserted data to the state
		dispatch({ type: "updatePatientData", payload: obj });
		//to add data to be saved to the server
		dispatch({ type: "addDataToBeSaved", payload: obj });
		// to show or hide save button
		const inputSate = obj.state != "old";
		dispatch({ type: "changesAreMade", payload: { inputSate } });
	};
	return (
		<div className={"main-div"}>
			<div>
				{state.patientData.map((j, i) =>
					j.state !== "removed" ? (
						<InsertDataInput
							key={j.id + i}
							data={j}
							onDelete={onDelete}
							onNewData={handleInputRequest}
						/>
					) : null
				)}
			</div>
			<div>
				{showSearchInput ? (
					<SearchInput
						onItemSelected={handleInputRequest}
						data={props.searchData}
					/>
				) : null}
			</div>
			<div className={"row"}>
				<a
					onClick={() => setShowSearchInput(!showSearchInput)}
					href="#"
				>
					{!showSearchInput ? (
						<>
							<Plus color="dodgerblue" size={22} />
							{"ajouter une donnée"}
						</>
					) : (
						<>
							<Dash color="dodgerblue" size={22} />
							{"masquer ajouter une données"}
						</>
					)}
				</a>

				{state.dataToBeSaved.length > 0 ? (
					<button onClick={saveData} className={"saveBtn"}>
						{" "}
						enregistrer des données
					</button>
				) : null}
			</div>
		</div>
	);
};

export default AddNewData;
