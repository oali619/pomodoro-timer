import React, { useState } from "react";
import BreakDuration from "./BreakDuration";
import FocusDuration from "./FocusDuration";
import PlayPause from "./PlayPause";
import Timer from "./Timer";
import useInterval from "../utils/useInterval";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  if (!prevState) return prevState;
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  // The current session - null where there is no session running
  // Allow the user to adjust the focus and break duration.
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const increaseFocus = () =>
    setFocusDuration((focus) => (focus < 60 ? focus + 5 : focus));
  const decreaseFocus = () =>
    setFocusDuration((focus) => (focus > 5 ? focus - 5 : focus));
  const increaseBreak = () =>
    setBreakDuration((time) => (time < 15 ? time + 1 : time));
  const decreaseBreak = () =>
    setBreakDuration((time) => (time > 1 ? time - 1 : time));

  /**
   * Custom hook that invokes the callback function every second
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (!session) return session;
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  /**
   * Called whenever the stop button is clicked.
   */
  const stopTimer = () => {
    setSession(null);
    setIsTimerRunning(false);
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration
          focusDuration={focusDuration}
          increaseFocus={increaseFocus}
          decreaseFocus={decreaseFocus}
          session={session}
        />
        <BreakDuration
          breakDuration={breakDuration}
          increaseBreak={increaseBreak}
          decreaseBreak={decreaseBreak}
          session={session}
        />
      </div>

      <div>
        <PlayPause
          playPause={playPause}
          stopTimer={stopTimer}
          isTimerRunning={isTimerRunning}
          session={session}
        />
        <Timer
          isTimerRunning={isTimerRunning}
          session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
