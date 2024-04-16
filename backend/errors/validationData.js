export const validationData = {
    email_required:'Please input your email',
    email_format:'Email format is invalid',

    password_required:'Please input your password',
    password_format:'Password must contain alphanumerics',
    password_length:'Password must be between 6-20 characters',

    name_required:'Please input your name',
    name_length:'name must be between 2-30 characters',

    phone_format:'Phone number format is invalid',
    phone_length:'Phone must be between 10-15 numbers',
    phone_required:'Please input your phone number',

    address_required:'Please input your address',
    address_length:'Address reached maximum limit of 300 characters',

    stock_required:'Please input your product stock',
    stock_format:'Product stock must be numeric',
    stock_amount:'Product stock must be more than 0',

    product_name_required:'Please input your product name',
    product_name_length:'Product name must be between 10-150 characters',
    
    product_description_required:'Please input your product description',
    product_description_length:'Product description reached maximum limit of 1500 characters',

    product_init_price_required:'Please input your product price',
    product_init_price_limit:'Product price must be at least Rp.100,-',
    product_disc_price_limit:'Discount price must be at least Rp.100,-'

}

export const roles = ['user','admin']