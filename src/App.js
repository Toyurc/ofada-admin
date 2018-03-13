import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //set initial state 
      todaysOrders: [],
      sumOfAllTodaysOrders: '',
    };
  };
  
  componentDidMount() {
    this.getDailyOrders();
    this.getDailyTotals();
  };

  getDailyOrders() {
    axios
      .get('https://ofada-squad.herokuapp.com/food/today/orders')
      .then(resp => {
          console.log(resp.data);
          this.setState({ todaysOrders: resp.data });
        })
      .catch(err => {
          console.log(err)
        });
  };

  getDailyTotals() {
    axios
      .get('https://ofada-squad.herokuapp.com/food/today/total-price')
      .then(resp => {
        console.log(resp.data);
        this.setState({ sumOfAllTodaysOrders: resp.data.sumOfAllOrders })
      })
      .catch(err => {
        console.log(err)
      });
  };


  render() {
    return (
      <div className="background">
        <h1>Ofada Admin</h1>
        <div>
          {this.state.todaysOrders.map( order => {
            if (order.foodType === 'non-swallow') {
              return (
                <div>
                  <span>Name: {order.user}</span>
                  <div>
                    {order.foodItems.map(food => <p>{food[0]} - {food[1]}</p> )}
                  </div>
                  <p>Meal Price: {order.priceOfOrder}</p>
                  <p>Food Type: {order.foodType}</p>
                  <br />
                </div>              
              )
            }
          })}
        </div>
        <div>
          {this.state.todaysOrders.map( order => {
            if (order.foodType === 'swallow') {
              return (
                <div>
                  <p>Name: {order.user}</p>
                  <div>
                    {order.foodItems.map(food => <p>{food[0]} - {food[1]}</p> )}
                  </div>
                  <p>Meal Price: {order.priceOfOrder}</p>
                  <p>Food Type: {order.foodType}</p>
                  <br />
                </div>              
              )
            }
          })}
        </div>
        <p>Total Price of Meals: {this.state.sumOfAllTodaysOrders}</p>
      </div>
    )
  }
}
export default App;
