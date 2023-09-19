const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function CurrencyFormatter(price) { 
  if(typeof price === 'string') {
    return formatter.format(Number(price))
  }else {
    return formatter.format(price)
  }
}

export default CurrencyFormatter