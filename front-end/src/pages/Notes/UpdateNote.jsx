import { useLocation, useNavigate } from "react-router-dom";
import NoteForm from "../../components/Notes/NoteForm.component.jsx";
import { fields } from "../../utils/form/fields/notes/notes.js";
import { useEffect } from "react";
// import "./NotePage.css";
import { Button } from "react-bootstrap";
const UpdateNote = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { note = {} } = location?.state;

    useEffect(() => {

        if (Object.keys(note).length === 0) {
            
            // alert('edit object not fetched properly');
            navigate(-1);
        }
    }, []);
    return (
        <>
            <div  className="component-container">
                <h1> User Login </h1>
                <div className="form-container w-100">
                    <NoteForm operation={'edit'} data={note} fieldsArray={fields} />
                </div>
                <Button className="btn back-btn"  onClick={() => navigate(-1)}> Back </Button>
            </div>
        </>
    )
}

export default UpdateNote