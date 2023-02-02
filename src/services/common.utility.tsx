export const numFormatter = (num: number) => {
  if(String(num).length < 4)
    return String(num);
  else if(String(num).length < 7)
    return String(Math.floor(num)/ 1000) + 'K'
  else
    return String(Math.floor(num) / 1000000) + 'M'
}