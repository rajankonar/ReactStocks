import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Bar} from 'react-chartjs-2';


class MyChart extends Component{
  constructor(props) {
    super(props);
    this.state = {
      graphKeyData:[],
      graphData:[],
      finalData:{
        labels: [],
        datasets: [
          {
            label: 'Stock updates',
            backgroundColor: 'rgba(63, 81, 181,0.2)',
            borderColor: '#3f51b5',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
          }
        ]
      }
    }

  }
  componentWillReceiveProps(nextProps) {
    this.state.finalData.datasets[0].data = [];
    this.state.finalData.labels = [];

    for (var key in this.props.stocksGraphData) {
      this.state.finalData.datasets[0].data = this.state.finalData.datasets[0].data.concat(this.props.stocksGraphData[key]);
      this.state.finalData.labels = this.state.finalData.labels.concat(key);
    }
    //console.log(this.state.finalData.datasets[0].data);
  }
  render(){
    return(
      <div className="chart-wrapper">
        <Bar data={this.state.finalData} width={1000} height={500} options={{ maintainAspectRatio: false }} />
      </div>
    )
  }
}
const mapStateToProps = function(state){
  return{
    stocksGraphData:state.stocksGraphData
  }
}

export default connect(mapStateToProps)(MyChart);