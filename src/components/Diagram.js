import React, {Component} from 'react';
import '../styles/registration.css';
import '../styles/spinner.css';
import Paper from 'material-ui/Paper';
import '../../node_modules/react-vis/dist/style.css';
import '../styles/diagram.css';
import {HorizontalBarSeries,XYPlot,XAxis, YAxis, LineSeries, VerticalBarSeries} from 'react-vis';



class Diagram extends Component {
  // shouldComponentUpdate() {
  //
  // }
  render() {
    return(
      <Paper className="diagram">
        <div className="diagram-header">
          {this.props.header}
          <div className="column-value">
            {this.props.id === this.props.currentValue.id ? this.props.currentValue.value : null}
          </div>
        </div>

        <XYPlot height={200} width={400} xType={'ordinal'} animation={true}>
          <VerticalBarSeries
            data={this.props.statistic}
            onValueMouseOver={(d) => { console.log(d.y);this.props.setCurrentStatisticValue(d.y, this.props.id);}}
            onValueMouseOut={(d) => { console.log('hey');this.props.setCurrentStatisticValue(0, 0)}}
          />
          <XAxis />
          <YAxis />
        </XYPlot>
      </Paper>
    )
  }

}



export default Diagram;