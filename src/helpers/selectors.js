// function getAppointmentsForDay(state, day) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export default function getAppointmentsForDay(state, day) {
  const daysArray = [];
  for (const aptDay of state.days) {
    if (aptDay.name === day) {
      daysArray.push(aptDay);
    }
  }

  if (daysArray === [] || !day || daysArray[0] === undefined) {
    return [];
  }

  const aptArr = daysArray[0].appointments;

  const dayApts = [];

  for (const appointment of Object.values(state.appointments)) {
    if (aptArr.includes(appointment.id)) {
      dayApts.push(appointment);
    }
  }
  return dayApts;
}
