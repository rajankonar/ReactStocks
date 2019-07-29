
import { createStore, applyMiddleware,combineReducers } from 'redux';

const initialState ={
  stocks:[],
  stocksPrice:[],
  stocksGraphData:[]
}



/* reducer actions */
const reducer = (state = initialState, action) => {
  if(action.type == "ADDGRAPH"){
    state.stocks[action.payload.stockname] = [0,action.payload.stockprice];
    state.stocksGraphData[action.payload.stockname] = action.payload.stockprice;
  }else if(action.type == "UPDATEGRAPH"){
    state.stocksPrice = [...state.stocksPrice,action.payload.stockprice] ;
    state.stocks[action.payload.stockname] = [...state.stocksPrice,action.payload.stockprice];
    if(state.stocks[action.payload.stockname].length > 6){
      state.stocks[action.payload.stockname] = state.stocks[action.payload.stockname].slice(Math.max(state.stocks[action.payload.stockname].length - 5, 1));
    }
    state.stocksGraphData[action.payload.stockname] = action.payload.stockprice;
  }
  return state;
}

/* reducer store */
const store = createStore(reducer);

store.subscribe(() => {
  //console.log('store updated',store.getState()); 
});


export default store;