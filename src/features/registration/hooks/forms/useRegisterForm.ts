// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useRegisterSchema } from '../schemas/register.schema';
import type {RegisterPayload} from "../../api/useRegisterApi";


export function useRegisterForm() {
    // useForm with schema
    const {  defineField, handleSubmit } = useForm<RegisterPayload>({
        validationSchema: useRegisterSchema,
        initialValues: {company:"", email:"", username:"", password:""}
    })

    // define fields
    const [company, companyAttrs] = defineField('company');
    const [email, emailAttrs] = defineField('email');
    const [username, usernameAttrs] = defineField('username');
    const [password, passwordAttrs] = defineField('password');

    return {
        handleSubmit,
        company,
        companyAttrs,
        username,
        usernameAttrs,
        email,
        emailAttrs,
        password,
        passwordAttrs
    }
}