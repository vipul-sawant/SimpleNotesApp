import NotesList from "../../components/Notes/NotesList.component.jsx";
import "./Dashboard.css";
const Dashboard = () => {
    return (
        <>
            {/* <div className="component-container"> */}
            <div className="dashboard-container">
                <NotesList />
            </div>
        </>
    );
};

export default Dashboard