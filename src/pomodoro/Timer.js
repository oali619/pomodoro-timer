import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function Timer({ focusDuration, breakDuration, session }) {
  const focusProgress = () =>
    (1 - session.timeRemaining / (focusDuration * 60)) * 100;
  const breakProgress = () =>
    (1 - session.timeRemaining / (breakDuration * 60)) * 100;
  return (
    <>
      {session ? (
        <>
          <div className="row mb-2">
            <div className="col">
              <h2 data-testid="session-title">
                {session.label === "Focusing"
                  ? `${session.label} for ${minutesToDuration(
                      focusDuration
                    )} minutes`
                  : `${session.label} for ${minutesToDuration(
                      breakDuration
                    )} minutes`}
              </h2>

              <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(session.timeRemaining)} remaining
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
                    session.label === "Focusing"
                      ? focusProgress()
                      : breakProgress()
                  }
                  style={{
                    width:
                      (session.label === "Focusing"
                        ? focusProgress()
                        : breakProgress()) + "%",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
