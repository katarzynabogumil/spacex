/**
 * Date formatter for displaying launch details.
 */

function dateFormatter(dateInput: Date) {
  let date = new Date(dateInput);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let day = date.getDate();
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export { dateFormatter };