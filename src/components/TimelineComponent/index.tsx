// react libraries
import * as React from 'react';

// third party libraries
import MaterialIcon from '@material/react-material-icon';
import moment from 'moment';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';

// style
import 'react-vertical-timeline-component/style.min.css';
import './TimelineComponent.scss';

// interface
import { TimelineComponentProps } from './interfaces.d';

const TimelineComponent: React.FunctionComponent<TimelineComponentProps> = (props) => {
  const styles = {
    info: {
      background: `rgba(${25},${103},${210},${0.12}`,
      color: `rgba(${25},${103},${210},${0.87}`,
    },
    error: {
      background: `rgba(${210},${43},${53},${0.12}`,
      color: `rgba(${210},${43},${53},${0.87}`,
    },
  };
  const { activityLogs } = props;

  return (
    <VerticalTimeline layout="1-column">
      { activityLogs.map((logs, index) => {
        return (
          <VerticalTimelineElement
            key={index}
            // className="vertical-timeline-element--work"
            contentStyle={ (logs.type) ? styles.info : styles.error }
            // contentArrowStyle={ (logs.type) ? styles.info : styles.error }
            date={`${moment(logs.date).format('LLLL')}`}
            iconStyle={ (logs.type) ? styles.info : styles.error }
            icon={
              <MaterialIcon
                className="activity-log-icon"
                hasRipple
                icon={logs.type ? 'check' : 'error_outline'}
                initRipple={null}
              />
            }
          >
          <p>{logs.message}</p>
        </VerticalTimelineElement>
        );
      })
      }
        {/*contentStyle={{ background: 'rgba(210,48,53,0.12)', color: 'rgba(210,48,53,0.87)' }}*/}
    </VerticalTimeline>
  );
};

export default TimelineComponent;
