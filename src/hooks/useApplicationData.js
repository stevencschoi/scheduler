import { useState, useEffect } from "react";
import axios from "axios";
// stretch assignment to include sockets for real-time data updating
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // pulling out repetitive code for modularity
  function updateAppointment(id, interview) {
    // update state based on whether interview is truthy or falsy
    if (!interview) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState(prev => ({ ...prev, appointments }));
    } else {
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
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // push new appointment to database and set state
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({ ...prev, appointments }));
      Promise.all([axios.get(`/api/days`)]).then(([days]) => {
        setState(prev => ({
          ...prev,
          days: days.data
        }));
      });
    });
  }
  // updating the specific appointment state with null interview
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
      Promise.all([axios.get(`/api/days`)]).then(([days]) => {
        setState(prev => ({
          ...prev,
          days: days.data
        }));
      });
    });
  }

  useEffect(() => {
    socket.onopen = function() {
      socket.send("ping");
    };
  }, []);

  socket.onmessage = function(event) {
    // parse message from server
    const msg = JSON.parse(event.data);
    // listen for SET_INTERVIEW and update state
    if (msg.type === "SET_INTERVIEW") {
      updateAppointment(msg.id, msg.interview);
    }
  };

  // close connection
  socket.onclose = function() {
    console.log("Connection closed");
  };

  const setDay = day => setState({ ...state, day });

  // update state and resolve promises whenever appointments are updated
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
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
