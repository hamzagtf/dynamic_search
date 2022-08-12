import { useEffect, useState } from "react";
import AddNewData from "./dynamic-search";

async function sendDataToServer(data, url, method){
	const response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		
	return response.json();
}

// to reform data to be saved to the server 
const reformData=(data,patient)=>data.map(i=>(
	{
		id: i.id,
		unitName:i.unitName,
		unit:i.unit,
		patient,
		value:i.value,
		date:i.date
	}
 ));


function App() {

	const [data,setData] = useState([]);
	const [patientData, setPatientData] = useState([]);
	const [patientID, setPatientID] =useState(1) //change it to get patient id from url
	

	
	const save =(data)=>{
	// new data
	const newData = data.filter(j=>j.state ==="new")
	const ndata   = newData.length ? reformData(newData, patientID) : null
	
	 // update data
	const updated_data = data.filter(j=>j.state ==="changed")
	const u_data   = updated_data.length ? reformData(updated_data, patientID) : null
	
	 // removed 
	 const removed        = data.filter(j=>j.state ==="removed")
	 const deletedDataIds = removed.length? removed.map(i=>i.id) : null ; // deleted ids
	 const deletedData     = removed.length? reformData(removed, patientID) : null
	 const archive_url = 'http://127.0.0.1:8000/app/patientArchive/';
	//  console.log(removed)

	 if(newData.length)
	 {
		const patient_url = 'http://127.0.0.1:8000/app/patient/';
		
		// save to the server
		sendDataToServer(ndata, patient_url, 'POST');
		sendDataToServer(ndata, archive_url, 'POST');
	 }
	 if(updated_data.length){
		//update data from origenal data
		const serverUpdatedData = u_data.map(i => ({id:i.id, body:i}))	
		serverUpdatedData.map(item => (
			sendDataToServer(item.body, `http://127.0.0.1:8000/app/patient/${item.id}/`, 'PUT')
		))
		sendDataToServer(u_data, archive_url, 'POST');
		

	 }
	 if(removed.length)
	 {
		// delete data from origenal data
		//...here use >> deletedDataIds
		console.log(deletedDataIds)
		deletedDataIds.map(i => (
			sendDataToServer('', `http://127.0.0.1:8000/app/patient/${i}`, 'DELETE')
		))
		
		// save deleted data to archives
		//... use>> deletedData
	 }
		
	}
	useEffect(()=>{
	const data_F = fetch('http://127.0.0.1:8000/app/')
	data_F.then(i=>i.json())
	.then(n=>{
		const d = n.map(i=>({...i, id:String(i.id)}));
		setData(d);
	}).catch(err=>console.log("Could not fetch Search Data", err));

	const pData = fetch(`http://127.0.0.1:8000/app/patient/${patientID}`);
	pData.then(i=>i.json())
	.then(n=>{
		
		const pdata =n.map(i=>({...i, state:"old",id:String(i.id)}));
		setPatientData(pdata);
	})
	// get patient id and set it to the state

	

	},[])
	
		
	return (
		<div style={{width: '500px'}}>
			<AddNewData
				onSave={save}
				searchData={data} // data for search control
				patientData={patientData} // any previous saved data for the patient
			/>
		</div>
	);
}

export default App;