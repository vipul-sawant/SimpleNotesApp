import { useNavigate } from "react-router-dom";
import UserForm from "../../components/User/UserForm.component.jsx";
import { fields } from "../../utils/form/fields/user/login.js";
import { Button } from "react-bootstrap";

const UserLogin = () => {
    const navigate = useNavigate();
    return (
        <>
            <div  className="input-form-container">
                <h1> User Login </h1>
                <UserForm fieldsArray={fields} operation={'login'}/>
                <Button className="my-btn btn-back" onClick={() => navigate('/user/register')}> Register </Button>
            </div>
        </>
    )
}

export default UserLogin;