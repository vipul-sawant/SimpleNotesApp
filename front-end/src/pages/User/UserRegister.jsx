import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/User/UserForm.component.jsx";
import { fields } from "../../utils/form/fields/user/register.js";
import { Button } from "react-bootstrap";

const UserRegister = () => {
    const navigate = useNavigate();
    return (
        <>
            <div  className="input-form-container">
                <h1> User Register</h1>
                <UserForm fieldsArray={fields} operation={'register'} />
                <Button className="my-btn btn-back" onClick={() => navigate('/user/login')}> Login </Button>
            </div>
        </>
    )
}

export default UserRegister;