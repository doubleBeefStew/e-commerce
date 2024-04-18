import * as Yup from 'yup'
import validationData from '../errors/validationData'

const profileSchema = Yup.object().shape({
    name:Yup.string()
        .min(2,validationData.name_length)
        .max(30,validationData.name_length)
        .required(validationData.name_required),
    email:Yup.string()
        .email(validationData.email_format)
        .required(validationData.email_required),
    phoneNumber:Yup.string()
        .matches(/^\d+$/,validationData.phone_format)
        .min(10,validationData.phone_length)
        .max(15,validationData.phone_length)
        .required(validationData.phone_required),
    address:Yup.string()
        .max(300,validationData.address_length)
        .required(validationData.address_required)
})

export default profileSchema