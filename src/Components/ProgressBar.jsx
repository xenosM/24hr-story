import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ProgressBar({  index, requiredIndex }) {
  const [progressValue, setProgressValue] = useState(0);
  //*FUNCTION
  //*USE EFFECT
  useEffect(() => {
    let interval;
    if (index == requiredIndex) {
      setProgressValue(0)
      interval = setInterval(() => {
        setProgressValue((p) => {
          if (p >= 3000) {
            clearInterval(interval);
            return 3000;
          }
          return p + 10;
        });
      }, 10); // Update every 10ms to reach 3000 in 3 seconds
    }
    if(index<requiredIndex) setProgressValue(3000);
    if(index>requiredIndex) setProgressValue(0);

    return () => {
      clearInterval(interval)
    };
  }, [index, requiredIndex]);

  return (
    <progress
      className="progress-bar"
      value={progressValue}
      max="3000"
    ></progress>
  );
}
ProgressBar.propTypes  = {
    index: PropTypes.number,
    requiredIndex: PropTypes.number
}
export default ProgressBar;
