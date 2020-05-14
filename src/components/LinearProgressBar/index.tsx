// import react library
import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from "@material-ui/core/styles/withStyles";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#e8f0fe',
  },
  barColorPrimary: {
    backgroundColor: '#1967D2',
  },
})(LinearProgress);

const LinearProgressBar = () => {
  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => {
    const progress = () => {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) return 0;
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      })
    }

    const timer = setInterval(progress, 500);
    return () => clearInterval(timer);
  }, [])

  return (
    <ColorLinearProgress variant="determinate" value={completed} />
  )
}

export default LinearProgressBar;