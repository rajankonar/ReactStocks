import React, { Component } from "react";
import StockRow from './StockRow.jsx';
import MyChart from './MyChart.jsx';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import { connect } from 'react-redux';
import store from './Store.jsx';

const url = 'ws://stocks.mnet.website/';

class StockList extends Component{

  constructor(props){
    super(props);
    this.state = {
      stocksData: [],
      response: []
    };
  }

  componentDidMount() {
    this.response = new WebSocket(url);
    this.response.onmessage = this.stockEventListener.bind(this);
  }
  stockEventListener(event) {
    var data = JSON.parse(event.data),priceStatus = '';
    data.map(function (data, index) {
      var indexStatus = this.state.stocksData.findIndex((e) => e[0] === data[0]);
      if (indexStatus != -1) {
        this.state.stocksData[indexStatus][1] > data[1] ? priceStatus = 'down' : priceStatus = 'up';
        this.setState(stocksData => ({
          stocksData: this.state.stocksData.map(
            obj => (obj[1] > data[1]  ? Object.assign(obj, { 'priceStatus': priceStatus })  : obj )
          )
        }));
        this.setState(stocksData => ({
          stocksData: this.state.stocksData.map(
            obj => (obj[0] === this.state.stocksData[indexStatus][0]  ? Object.assign(obj, { 1: data[1],2:new Date })  : obj )
          )
        }));

        store.dispatch({
          type: "UPDATEGRAPH",
          payload:{
            stockname : data[0],
            stockprice : data[1],
          }
        });
      }
      else {
        priceStatus='';
        if(this.state.stocksData.length <10){
          this.setState({
            stocksData: [...this.state.stocksData, [data[0], data[1], new Date]]
          })
          store.dispatch({
            type: "ADDGRAPH",
            payload:{
              stockname : data[0],
              stockprice : data[1],
            }
          });
        }
      }

      /* clearing variables */
      priceStatus ='';
    }, this);
  }

  render(){
    return(
      <div>
        <AppBar>
          <Container maxWidth="md">React Stocks</Container>
        </AppBar>
        <div className="stock-list">
          <Container maxWidth="md">
            <label className="stock-label"> Stocks grap updates :  </label>
            <MyChart stocksData={this.state.stocksData}></MyChart>
            <label className="stock-label"> You can find update of stocks over here!! </label>
            <Paper className="root">
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ticker</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">
                      <SvgIcon>
                        <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
                      </SvgIcon>
                    </TableCell>
                    <TableCell align="center">
                      Visual update
                    </TableCell>
                    <TableCell align="right">Last Update</TableCell>
                  </TableRow>
                </TableHead>
                <StockRow stocksData={this.state.stocksData} />
              </Table>
            </Paper>
          </Container>
        </div>
      </div>
    );
  }
}

export default StockList;