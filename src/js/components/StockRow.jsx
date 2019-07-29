import React, {	Component } from "react";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MyChart from './MyChart.jsx';
import PriceStatus from './PriceStatus.jsx';
import { Sparklines,SparklinesLine,SparklinesSpots  } from 'react-sparklines';
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { connect } from 'react-redux';

const formatter = buildFormatter(frenchStrings)

class StockRow extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    //console.log('updated');
  }
  componentWillReceiveProps(nextProps) {
    //this.state.stocksGraphData = this.props.stockItems;
    //this.state.stocksDate = this.props.stocksDate;
    //console.log(this.props.stocksData);
  }

  render() {
    return ( 
      <TableBody> 
        {this.props.stocksData.map(row => (
          <TableRow key={row[1]}> 
            <TableCell component="th" scope="row"> {row[0]} </TableCell> 
            <TableCell align="right" className={row['priceStatus']}> {row[1].toFixed(3)} </TableCell> 
            <TableCell align="right"> 
              <PriceStatus status={row['priceStatus']} />
            </TableCell> 
            <TableCell align="center"> 
              <Sparklines data={this.props.stockItems[row[0]]} limit={5} width={100} height={30} margin={2}>
                <SparklinesLine/>
                <SparklinesSpots />
              </Sparklines>
            </TableCell> 
            <TableCell align="right">
              <TimeAgo date={row[2]} formatter={formatter} />
            </TableCell> 
          </TableRow>
        ))}
      </TableBody>
    );

  }
}
const mapStateToProps = function(state){
  //console.log(store.getState());
  return{
    stockItems:state.stocks
  }
}

export default connect(mapStateToProps)(StockRow);