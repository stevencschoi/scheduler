// function getAppointmentsForDay(state, day) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

function getAppointmentsForDay(state, day) {
  const daysArray = [];
  // if day.name of daysArray[i], get that day object
  for (const aptDay of state.days) {
    if (aptDay.name === day) {
      daysArray.push(aptDay);
    }
  }

  if (daysArray === [] || !day || daysArray[0] === undefined) {
    return [];
  }

  const aptArr = daysArray[0].appointments; // apt ids for day
  const dayApts = [];

  // if items in array id matches appointment obj, show
  for (const appointment of Object.values(state.appointments)) {
    if (aptArr.includes(appointment.id)) {
      dayApts.push(appointment);
    }
  }
  return dayApts;
}

// return obj if passed in an obj that contains interviewer
function getInterview(state, interview) {
  if (interview === null || !interview) {
    return null;
  }

  for (const interviewer of Object.values(state.interviewers)) {
    if (interview.interviewer === interviewer.id) {
      return { student: interview.student, interviewer: interviewer };
    }
  }
}

module.exports = {
  getAppointmentsForDay,
  getInterview
};
