
const AutoCompleteItem =(props)=>{
	const text = props.text
	const sIndex = props.text.indexOf(props.searchVal);
	const eIndex= sIndex + props.searchVal.length;
	const boldText =`<b>${text.substring(sIndex, sIndex+eIndex)}</b>`
	
	return <li onClick={()=>props.onItemSelected(props.id)} className={"auto-complete-items"}>
	
	<p dangerouslySetInnerHTML = {{__html:text.replace(text.substring(sIndex, sIndex+eIndex),boldText)}}/>
	</li>;
};
export default AutoCompleteItem;