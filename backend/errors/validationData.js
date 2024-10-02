export const validationData = {
    total_price_numeric:'Total price value must be numeric only',
    total_price_required:'Please input total price',

    email_required:'Please input your email',
    email_format:'Email format is invalid',

    password_required:'Please input your password',
    password_format:'Password must be between 8-25 characters, is alphanumerics, contains uppercase and lowercase, and a special character',

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

    products_required:'Please input products list',
    product_name_required:'Please input your product name',
    product_name_length:'Product name must be between 5-150 characters',
    product_description_required:'Please input your product description',
    product_description_length:'Product description reached maximum limit of 1500 characters',
    product_init_price_required:'Please input your product price',
    product_init_price_limit:'Product price must be at least Rp.100,-',

    payment_method_required:'Please input payment method',

    shipping_fee_required:'Please input shipping fee',
    shipping_fee_numeric:'Shipping fee value must be numeric',
    shipping_method_required:'Please input shipping method',

    discount_numeric:'Discount value must be numeric',
}

export const roles = ['user','admin']
export const status = ['WAITING FOR PAYMENT','PAID','SHIPPING','DELIVERED','RETURNED','CANCELLED']
export const paymentMethod = ['DealDashPAY','PAYPAL','CREDITCARD']
export const shippingMethod = ['DealDashEXPRESS','JNE', 'JNT', 'ANTERAJA']