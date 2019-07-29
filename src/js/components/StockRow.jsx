import React, {	Component } from "react";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import MyChart from './MyChart.jsx';
import PriceStatus from './PriceStatus.jsx';
import { Sparklines,SparklinesLine,SparklinesSpots  } from 'react-sparklines';
import { connect } from 'react-redux';

let dataValues =[],
    forDataCheckLoopOne=[],
    forDataCheckLoopTwo=[];
var objDataValues = {};


class StockRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksGraphData: ['fetching',false],
      stocksDataSparkle:['z']
    };
  }
  componentDidUpdate() {
    //console.log('updated');
  }
  componentWillReceiveProps(nextProps) {
    this.state.stocksGraphData = this.props.stockItems;
    console.log(this.props.stockItems);
  }



  render() {
    return ( 
      <TableBody> 
        {this.props.stocksData.map(row => (
          <TableRow key={row[1]}> 
            <TableCell component="th"	scope="row"> {row[0]} </TableCell> 
            <TableCell align="right" className={row['priceStatus']}> {row[1].toFixed(3)} </TableCell> 
            <TableCell align="right"> 
              <PriceStatus status={row['priceStatus']} />
            </TableCell> 
            <TableCell align="center"> 
              <Sparklines data={[4, 4, 5,9,3 ]} limit={5} width={100} height={30} margin={2}>
                <SparklinesLine/>
                <SparklinesSpots />
              </Sparklines>
            </TableCell> 
            <TableCell align="right"> {row['priceStatus']} </TableCell> 
          </TableRow>
        ))}
      </TableBody>
    );

  }
}
const mapStateToProps = function(state, {params}){
  //console.log(store.getState());
  return{
    stockItems:state.stocks
  }
}
 function isPositive(value) {
  return value > 0;
}
export default connect(mapStateToProps)(StockRow);