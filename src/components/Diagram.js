import React from 'react';
import '../styles/registration.css';
import '../styles/spinner.css';
import Paper from 'material-ui/Paper';
import '../../node_modules/react-vis/dist/style.css';
import '../styles/diagram.css';
import {HorizontalBarSeries,XYPlot,XAxis, YAxis, LineSeries, VerticalBarSeries} from 'react-vis';

const Diagram = (props) => {
  return(
    <div>
      <div className="diagram-header">
        {props.header}
        <div className="column-value">
          {props.id === props.currentValue.id ? props.currentValue.value : null}
        </div>
      </div>

      <XYPlot height={300} width={300} xType={'ordinal'} animation={true}>
        <VerticalBarSeries
          data={props.statistic}
          onValueMouseOver={(d) => { console.log(d.y);props.setCurrentStatisticValue(d.y, props.id);}}
          onValueMouseOut={(d) => { console.log('hey');props.setCurrentStatisticValue(0, 0)}}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  )
};


export default Diagram;