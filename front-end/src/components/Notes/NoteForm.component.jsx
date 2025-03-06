import { useState, useEffect } from "react";

import { replace, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";

import buildSchema from "../../utils/yup/buildSchema.js";

import { addNote, reArrange, updateNote } from "../../redux/slices/notesSlice.js";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import validateNote from "../../utils/form/validate/noteData.js";

const NoteForm = ({fieldsArray, operation, data={}}) => {

	console.log("operation :", operation);
	const { user = {} } = useSelector(state=>state?.auth || {});
	const { error = null } = useSelector(state=>state?.notes || {});

	const [ noteError, setNoteError ] = useState(null);
	const [ formfields, setFormFields ] = useState(fieldsArray);
    const schema = buildSchema(formfields, 'note');

    const setDefaultValues = (fields, data) => {

        const reducedObj = fields.reduce((acc, field)=>{

            acc[field.name] = data[field.name] || field.default;
            return acc;
        }, {});

        return reducedObj;
    };

    const [ fieldsDefaults, setFieldDefaults ] = useState(setDefaultValues(formfields, data));

	const { control ,handleSubmit, formState:{errors}, reset } = useForm(
        {
            resolver:yupResolver(schema),
            defaultValues:fieldsDefaults
        });
		
    const navigate = useNavigate();
    const dispatch = useDispatch();

	const [ redirect, setRedirect ] = useState(false);
    const [ noteID, setNoteID ] = useState(null);

	const formSubmit = async (formValueObj, e) => {

		console.log('formValuesObj :', formValueObj);

		try {
			let noteAction;
			if (operation === "add") {
				
				noteAction = await dispatch(addNote(formValueObj));
			} else if (operation === "edit") {
                const noteData = await validateNote(formValueObj, data);

				console.log('noteDate length :', Object.keys(noteData).length, !Object.keys(noteData).length);
				if (!Object.keys(noteData).length) {
					
					alert("nothing to Update")
				} else {
					console.log('noteID :', noteID);
					noteAction = await dispatch(updateNote({noteData, noteID}));
				}
			}

			console.log('noteAction :', noteAction);
			if (noteAction?.error) {
				// if (error && typeof error === "string" && error.trim().length > 0) {
					
					alert(noteAction.payload);
				// }
				// return;
			} else{

				await dispatch(reArrange({}));
				reset();
                setRedirect(true);
			}


		} catch (error) {
			
			console.log('Error :', error);
			// alert(error?.response?.data?.message)
		}
	};

	const formErrors = (errors, e) => {
		console.error("errors :", errors);
	}

    useEffect(() => {


        if (operation === "edit") {

            setNoteID(data._id);
        } 
    }, []);

	useEffect(()=>{

		if (redirect) {
			
			navigate(`/users/${user?.username}/dashboard`);
		}
	}, [redirect, user]);

	// useEffect(()=>{

	// 	console.log("note error :", error);

	// 	if (noteError) {
			
	// 		alert(noteError);
	// 		setNoteError(null);
	// 	}
	// 	if (error && typeof error === "string" && error.trim().length > 0) {

	// 		setNoteError(error);
	// 		console.log("note Error :", noteError);
	// 	}
	// }, [error,noteError]);
	return (
		<>
			<Form onSubmit={handleSubmit(formSubmit, formErrors)} noValidate>
					{formfields.map(field=>(

						<Form.Group key={field.name} controlId={field.name}  className="form-group-wrapper">
							<Row>	
								<Col sm={12} className="col-wrapper">
									<Form.Label className="form-label"> {field.label} </Form.Label>
								</Col>

								<Col sm={12}>
									<Controller name={field.name}
											control={control}
											render={
												({field:controllerField})=>(
													<Form.Control {...controllerField}
														type={field.type}
														placeholder={field.placeholder}
														className="form-input">
													</Form.Control>)
										}></Controller>
								</Col>									
							</Row>	
						</Form.Group>
					))}

					<Button type="submit">{ operation} </Button>
				</Form>
			</>
	)
}

export default NoteForm;