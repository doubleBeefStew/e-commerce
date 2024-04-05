import * as Yup from 'yup'
import validationString from '../validationString/validationString'

const loginSchema = Yup.object().shape({
    email:Yup.string().required(validationString.email_required),
    password:Yup.string().required(validationString.password_required)
})

export default loginSchema