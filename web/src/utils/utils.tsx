const whatsappfy = (text: string) => {
  
  const ex = /[0-9]/g;
  const temp = text.match(ex)
  const num = temp ? temp.join('') : '';

  if (
    num.substr(-9,1)!=='9'
    && ['9','8'].indexOf(num.substr(-8,1))===-1
  ) {
    return `tel:${num}`
  }

  return `https://api.whatsapp.com/send?phone=${num}`
}

export default whatsappfy
