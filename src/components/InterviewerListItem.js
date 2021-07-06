import React from 'react';
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {

  const itemClass = classnames('interviewers__item', {
    "interviewers__item--selected": props.selected
  })

  
  return (
    <li className={itemClass}>
      <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      onClick={() => props.setInterviewer(props.name)}
      />
      {props.selected && props.name}
    </li>
  );
}