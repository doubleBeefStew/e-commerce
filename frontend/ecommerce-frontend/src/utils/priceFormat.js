const priceFormat = (x) => {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} 

export default priceFormat