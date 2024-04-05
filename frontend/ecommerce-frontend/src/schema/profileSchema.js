import * as Yup from 'yup'
import validationString from '../validationString/validationString'

const profileSchema = Yup.object().shape({
    name:Yup.string()
        .min(2,validationString.name_length)
        .max(30,validationString.name_length)
        .required(validationString.name_required),
    email:Yup.string()
        .email(validationString.email_format)
        .required(validationString.email_required),
    phoneNumber:Yup.string()
        .matches(/^\d+$/,validationString.phone_format)
        .min(10,validationString.phone_length)
        .max(15,validationString.phone_length)
        .required(validationString.phone_required),
    address:Yup.string()
        .max(300,validationString.address_length)
        .required(validationString.address_required)
})

export default profileSchema