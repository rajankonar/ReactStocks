
import { createStore, applyMiddleware,combineReducers } from 'redux';

const initialState ={
  stocks:[],
  stocksNames:[],
  stocksPrice:[]
}


/*state.stocks.map(
        obj => (obj[0] === state.stocks[sIndex][0]  ? Object.assign(obj, { 1:  action.payload.stockprice,2: action.payload.stockpricestatus,3:new Date  })  : obj )
      )*/

const reducer = (state = initialState, action) => {
  switch (action.type){
    case "ADDGRAPH":
      //state.result =+action.payload;
      state = {
        stocks: [...state.stocks, [action.payload.stockname,action.payload.stockprice,new Date]],
        stocksNames:[...state.stocksNames,action.payload.stockname]
      };
      break;
    case "UPDATEGRAPH":
      const sIndex = state.stocks.findIndex((e) => e[0] === action.payload.stockname);
      
      state.stocks.map(
        obj => (obj[0] === state.stocks[sIndex][0]  ? Object.assign(obj, { 1:  action.payload.stockprice,2: action.payload.stockpricestatus,3:new Date  })  : obj )
      )
      break;
  }
  return state;
}

const store = createStore(reducer);

store.subscribe(() => {
  //console.log('store updated',store.getState()); 
});

/*store.dispatch({
  type: "ADD",
  stockname:'ebr',
  payload: 10
});

store.dispatch({
  type: "ADD",
  stockname:'mu',
  payload: 20
});

store.dispatch({
  type: "UPDATE",
  stockname:'mu',
  payload: 100
});*/



export default store;