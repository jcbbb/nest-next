export function toDatetimeLocal(date) {
  let ten = (i) => (i < 10 ? '0' : '') + i,
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds())

  return YYYY + '-' + MM + '-' + DD + 'T' +
    HH + ':' + II + ':' + SS;
}
