import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const stylesPage = makeStyles({
  root: {
    width: "100%",
    color: "green",
  },
});

const ProgressBar = () => {
  const classList = stylesPage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classList.root}>
      <LinearProgress variant='determinate' value={progress} />
    </div>
  );
};

export default ProgressBar;
