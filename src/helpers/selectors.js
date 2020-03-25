function getAppointmentsForDay(state, day) {
  // if day.name of daysArray[i], get that day object
  const daysArray = state.days.filter(thisDay => thisDay.name === day);

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

const getInterviewersForDay = (state, day) => {
  //retrieves available interviewers for that day
  const filteredDays = state.days.filter(stateDay => day === stateDay.name);
  if (!(filteredDays !== [] && day && filteredDays[0])) {
    return [];
  }
  // interviewers for given day
  const { interviewers } = filteredDays[0];
  const interviewerList = [];

  for (const interviewer of interviewers) {
    interviewerList.push(state.interviewers[interviewer]);
  }
  return interviewerList;
};

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
};
