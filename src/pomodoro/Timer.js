import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

// Called to increase the progress-bar as time countsdown

export default function Timer(props) {
  const focusProgress = () =>
    (1 - props.session.timeRemaining / (props.focusDuration * 60)) * 100;
  const breakProgress = () =>
    (1 - props.session.timeRemaining / (props.breakDuration * 60)) * 100;
  return (
    <fragment>
      {props.session ? (
        <fragment>
          <div className="row mb-2">
            <div className="col">
              {/* Update message below to include current session (Focusing or On Break) total duration */}
              <h2 data-testid="session-title">
                {props.session.label === "Focusing"
                  ? `${props.session.label} for ${minutesToDuration(
                      props.focusDuration
                    )} minutes`
                  : `${props.session.label} for ${minutesToDuration(
                      props.breakDuration
                    )} minutes`}
              </h2>
              {/* Update message below correctly format the time remaining in the current session */}
              <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(props.session.timeRemaining)} remaining
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={
                    props.session.label === "Focusing"
                      ? focusProgress()
                      : breakProgress()
                  } // TODO: Increase aria-valuenow as elapsed time increases
                  style={{
                    width:
                      (props.session.label === "Focusing"
                        ? focusProgress()
                        : breakProgress()) + "%",
                  }} // TODO: Increase width % as elapsed time increases
                />
              </div>
            </div>
          </div>
        </fragment>
      ) : null}
    </fragment>
  );
}
