import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const SET_DAY = "SET_DAY";
  // const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  // const SET_INTERVIEW = "SET_INTERVIEW";

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case SET_DAY:
  //       return {
  //         /* insert logic */
  //       };
  //     case SET_APPLICATION_DATA:
  //       return {
  //         /* insert logic */
  //       };
  //     case SET_INTERVIEW: {
  //       return; /* insert logic */
  //     }
  //     default:
  //       throw new Error(
  //         `Tried to reduce with unsupported action type: ${action.type}`
  //       );
  //   }
  // }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({ ...prev, appointments }));
    });
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({ ...prev, appointments }));
    });
  }

  function updateAppointment(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prev => ({ ...prev, appointments }));
  }

  useEffect(() => {
    socket.onopen = function(event) {
      socket.send("ping");
    };

    socket.close();
  }, []);

  socket.onmessage = function(event) {
    const msg = JSON.parse(event.data);
    if (msg.type === "SET_INTERVIEW") {
      updateAppointment(msg.id, msg.interview);
    }
  };

  // make api get request whenever appointments are updated
  useEffect(() => {
    axios
      .get("/api/days")
      .then(days => setState(prev => ({ ...prev, days: days.data })));
  }, [state.appointments]);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(response => {
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      })
      .catch(err => {
        console.error(err);
      });
  }, [state.appointments]);

  return { state, setDay, bookInterview, deleteInterview };
}
