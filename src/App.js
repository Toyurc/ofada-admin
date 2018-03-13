import React, { Component } from 'react';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //set initail state of 
      foodItems: [],
      priceOfOrder: '',
      user: ''
    };
  };
    componentDidMount() {
      this.getDailyOrders();
      this.getDailyTotals();
    };

    getDailyOrders() {
      request
        .get('https://ofada-squad.herokuapp.com/food/today/orders')
        .then(resp => {
            console.log(resp);
          })
        .catch(err => {
            console.log(err)
          });
    };

    getDailyTotals() {
      request
        .get('https://ofada-squad.herokuapp.com/food/today/total-price')
        .then(resp => {
          console.log(resp);
        })
        .then( err => {
          console.log(err);
        });
    };


  render() {
    return <div className="background">
      <h1>Welcome Aboard</h1>
        <div />
      </div>
  }
}
export default App;
