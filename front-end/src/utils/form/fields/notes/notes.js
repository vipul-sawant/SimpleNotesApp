import * as Yup from 'yup';

export const fields = [
    {
        name: "title",
        default:'',
        type: "text",
        label: "Title",
        placeholder: "Create a Title",
        validation: Yup.string()
        .required()
    },
    {
        name: "content",
        default:'',
        type: "textarea",
        label: "",
        placeholder: "Enter Details",
        validation: Yup.string().required()
        
    }
];