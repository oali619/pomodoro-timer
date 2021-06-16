import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function FocusDuration(props) {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* Update this text to display the current focus session duration */}
          Focus Duration: {minutesToDuration(props.focusDuration)}
        </span>
        <div className="input-group-append">
          {/* Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={props.decreaseFocus}
            disabled={props.session != null}
          >
            <span className="oi oi-minus" />
          </button>
          {/* Implement increasing focus duration  and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={props.increaseFocus}
            disabled={props.session != null}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}
