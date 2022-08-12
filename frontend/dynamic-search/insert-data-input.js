import { useEffect, useState, useRef, useContext, createContext } from "react";
import { Trash, CheckLg } from "react-bootstrap-icons";

const InsertDataInput = (props) => {
	const inputRef = useRef(null);

	const date = new Date().toLocaleDateString();
	const [inputValue, setinputValue] = useState("");
	const [validated, setValidated] = useState(false);
	useEffect(() => {
		if (props.data.value && props.data.state != "old") {
			setinputValue(props.data.value);
			setValidated(true);
		}
	}, []);
	const enterKeyHandler = (e) => {
		const pressedKey = e.key;

		if (pressedKey === "Enter") {
			if (inputRef.current) {
				const val = inputRef.current.value;
				val ? setValidated(true) : setValidated(false);
				const state = props.data.state === "old" ? "changed" : props.data.state;
				if (val) {
					//inputRef.current.value = "";
					props.onNewData({
						...props.data,
						value: val,
						date,
						state /* the state can have the follwing values
							new ==> for new inserted data
							changed==> for previous changed data
							removed ==> for deleted data
							old==> for previous saved data
						*/,
					});
				}
			}
		}
	};
	useEffect(() => {
		document.addEventListener("keydown", enterKeyHandler);

		return () => document.addEventListener("keydown", enterKeyHandler);
	});

	return (
		<div className={"text-style row"}>
			<span className={"text-data-cell"}>{props.data.unitName}</span>
			<input
				className={"Saisir-input"}
				type={"text"}
				placeholder={"    Saisir"}
				ref={inputRef}
				value={inputValue}
				onChange={(e) => setinputValue(e.target.value)}
			/>
			<span>{props.data.unit}</span>

			{props.data.state === "old" ? (
				<span>
					<h4 className={"h4"}>
						{props.data.value ? props.data.value + " " + props.data.unit : null}
					</h4>
					{props.data.date ? (
						<h4 className={"h4"}>{"( " + props.data.date + " )"}</h4>
					) : null}
				</span>
			) : null}
			<a href="#" onClick={() => props.onDelete(props.data)}>
				<Trash color="red" size={20} />
			</a>
			{props.data.state != "old" && props.data.state != "new" ? (
				<span className="updated">
					actualisé <CheckLg color="#19f00a" size={20} />
				</span>
			) : null}
			{props.data.state === "new" && validated ? (
				<span className="updated">
					ajoutée <CheckLg color="#19f00a" size={20} />
				</span>
			) : null}
		</div>
	);
};

export default InsertDataInput;
