import * as Yup from 'yup'
import validationData from '../validationData/validationData'

const registerSchema = Yup.object().shape({
    email:Yup.string()
        .email(validationData.email)
        .required('please input you email address'),
    password:Yup.string()
        .min(6,'Password must be between 6-20 characters')
        .max(20,'Password must be between 6-20 characters')
        .required('please input your password'),
    repeatPassword:Yup.string()
        .oneOf([Yup.ref('password'),null], 'Password must match')
        .required('please confirm your password')
})

export default registerSchema