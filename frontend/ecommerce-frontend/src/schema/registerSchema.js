import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
    email:Yup.string()
        .email('incorrect email format')
        .required('please input you email address'),
    password:Yup.string()
        .min(6,'Password must be between 6-20 characters')
        .max(20,'Password must be between 6-20 characters')
        .required('please input you email address'),
    repeatPassword:Yup.string()
        .oneOf([Yup.ref('password'),null], 'Password must match')
        .required('please input you email address')
})

export default registerSchema