import Card  from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Button  from "react-bootstrap/Button";

import CardBody from "react-bootstrap/CardBody";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteNote } from "../../redux/slices/notesSlice.js";

const formattedTime = (utcDate) => {
    return new Date(utcDate).toLocaleString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const formattedTime2 = (utcDate) => {
    const dateObj = new Date(utcDate);
    const now = new Date();

    // Check if the given date is before today (ignoring the time)
    const isBeforeToday =
        dateObj.getFullYear() < now.getFullYear() ||
        dateObj.getMonth() < now.getMonth() ||
        dateObj.getDate() < now.getDate();

    if (isBeforeToday) {
        // Show full date for past dates
        return dateObj.toLocaleString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    } else {
        // Show only time for today's timestamps
        return `Today ${dateObj.toLocaleString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
      })}`;
    }
  };

const Note = ({ note }) => {

  const dispatch = useDispatch();

  const removeNote = async (id) => {

    const isConfirm = confirm("are your sure you want to delete this note");
    console.log(isConfirm);

    if (isConfirm) {

      const noteAction = await dispatch(deleteNote(id));

    const actionError = Object.keys(noteAction?.error || {});

    if (actionError.length === 0) {
      
      // alert('Note Deleted');
    }
    }
  };

  const navigate = useNavigate();
  return (
    <Card className="m-3 shadow-sm p-3">
      <CardBody>
        {/* Title & Date */}
        <Row className="align-items-center">
          <Col>
            <h1 className="mb-0">{note.title}</h1>
          </Col>
          <Col className="text-end">
            <h4 className="text-muted">{formattedTime2(note.updatedAt)}</h4>
          </Col>
        </Row>

        {/* Description */}
        <Row className="mt-2">
          <Col>
            <p className="text-secondary">{note.content}</p>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mt-3">
          <Col className="d-flex justify-content-start">
            <Button variant="primary" className="me-2" onClick={()=>{ navigate(`/notes/${note._id}/edit`, {state:{note}}) }}>Edit</Button>
            <Button variant="danger" onClick={()=>{removeNote(note._id)}} >Delete</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Note;
