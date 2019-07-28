import React,{Component} from 'react';

import { AreaChart } from 'react-chartkick'
import 'chart.js'

class MyChart extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <AreaChart width="200px" height="50px" data={{"2017-01-01 00:00:00 -0800": 2, "2017-01-01 00:01:00 -0800": 5}} />
    )
  }

}

export default MyChart;