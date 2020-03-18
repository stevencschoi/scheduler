// function getAppointmentsForDay(state, day) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
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
    // console.log(dayApts);
  }
  return dayApts;
}

// export function getAppointmentsForDay(state, day) {
//   let filteredDays = state.days.filter(thisDay => thisDay.name === day);
//   if (filteredDays === [] || !day || filteredDays[0] === undefined) {
//     return []
//   }
//   const { appointments } = filteredDays[0]
//   // console.log(appointments)
//   // const answer = state.appointments.filter(thisDay => thisDay.name === day);
//   const answer = []
//   // console.log(Object.values(state.appointments))
//   for (let appointment of Object.values(state.appointments)) {
//     // console.log(appointment)
//     if (appointments.includes(appointment.id)) {
//       answer.push(appointment)
//     }
//   }
//   console.log(answer)
//   return answer;
// }
