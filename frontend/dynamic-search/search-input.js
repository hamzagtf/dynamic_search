import { useState, useRef } from "react";
import { Trash } from "react-bootstrap-icons";
import AutoComplete from "./auto-complete.js";

const SearchInput = (props) => {
	const [showAutoComplete, setShowAutoComplete] = useState(false);
	const [searchVal, setSearchVal] = useState(null);

	const handleAutoComplete = (e) => {
		const val = e.target.value;
		val.length >= 1 ? setShowAutoComplete(true) : setShowAutoComplete(false);
		setSearchVal(val);
	};

	const hide = document.addEventListener("click", () => {
		setShowAutoComplete(false);
	});

	return (
		<div>
			<input
				onChange={handleAutoComplete}
				className={"search-input"}
				type="text"
			/>
			{showAutoComplete ? (
				<AutoComplete
					onItemSelected={props.onItemSelected}
					searchVal={searchVal}
					data={props.data} // data for auto complete
					onHide={() => setShowAutoComplete(false)}
				/>
			) : null}
		</div>
	);
};

export default SearchInput;
