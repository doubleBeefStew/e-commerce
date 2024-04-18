import * as Yup from 'yup'
import validationData from '../errors/validationData'

const loginSchema = Yup.object().shape({
    email:Yup.string().required(validationData.email_required),
    password:Yup.string().required(validationData.password_required)
})

export default loginSchema