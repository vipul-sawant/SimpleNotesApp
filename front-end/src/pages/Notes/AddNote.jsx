import { useNavigate } from "react-router-dom";
import NoteForm from "../../components/Notes/NoteForm.component.jsx";
import { fields } from "../../utils/form/fields/notes/notes.js";
// import "./NotePage.css";
import { Button } from "react-bootstrap";
const AddNote = () => {

    const navigate = useNavigate();
    return (
        <>
            <div  className="component-container">
                <h1> User Login </h1>
                <div className="form-container w-100">
                    <NoteForm operation={'add'} fieldsArray={fields} />
                </div>
                <Button className="btn back-btn"  onClick={() => navigate(-1)}> Back </Button>
            </div>
        </>
    )
}

export default AddNote;