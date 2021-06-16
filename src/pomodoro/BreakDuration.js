import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function BreakDuration(props) {
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            {/* Update this text to display the current break session duration */}
            Break Duration: {minutesToDuration(props.breakDuration)}
          </span>
          <div className="input-group-append">
            {/* Implement decreasing break duration and disable during a focus or break session*/}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={props.decreaseBreak}
              disabled={props.session != null}
            >
              <span className="oi oi-minus" />
            </button>
            {/* Implement increasing break duration and disable during a focus or break session*/}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={props.increaseBreak}
              disabled={props.session != null}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
