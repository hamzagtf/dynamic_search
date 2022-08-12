import { useEffect } from "react";
import AutoCompleteItem from "./auto-complete-item.js";

const AutoComplete = (props) => {
	const searchVal = props.searchVal.toLowerCase();
	const date = new Date().toLocaleDateString();
	const itemsData = props.data.filter((i) =>
		i.unitName.toLowerCase().includes(searchVal)
	);

	const onItemSelected = (id) => {
		const item = props.data.filter((i) => i.id === id);
		const newItem = {
			...item[0],
			state: "new",
			value: "",
			date,
		};
		function selected() {
			props.onItemSelected(newItem);
		}
		selected();
	};
	return (
		<ul className={"list"}>
			{itemsData.map((i) => (
				<AutoCompleteItem
					key={i.id}
					text={i.unitName}
					id={i.id}
					searchVal={searchVal}
					onItemSelected={() => onItemSelected(i.id)}
				/>
			))}
		</ul>
	);
};
export default AutoComplete;
