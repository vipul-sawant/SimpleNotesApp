import { useSelector } from "react-redux";
import Note from "./Note.component.jsx";

const NotesList = () => {

	const { notes = [] } = useSelector(state=>state?.notes || {});

	console.log('notes :', notes);
	return (<>
		{/* <div className="notes-container"> */}
			{ notes.length > 0 && notes.map(note=>( <Note key={note._id} note={note} />)) }
			{ notes.length === 0 && <h1 style={{margin:"auto", color:"#FCA311"}}> No Notes </h1> }
		{/* </div> */}
	</>);
}

export default NotesList