import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //set initial state
      todaysOrders: [],
      sumOfAllTodaysOrders: ""
    };
  }

  componentDidMount() {
    this.getDailyOrders();
    this.getDailyTotals();
  }

  getDailyOrders() {
    axios
      .get("https://ofada-squad.herokuapp.com/food/today/orders")
      .then(resp => {
        this.setState({ todaysOrders: resp.data.orders });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDailyTotals() {
    axios
      .get("https://ofada-squad.herokuapp.com/food/today/total-price")
      .then(resp => {
        this.setState({ sumOfAllTodaysOrders: resp.data.sumOfAllOrders });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return this.state.todaysOrders.length > 0 ? (
      <div className="background">
        <h1>Ofada Admin</h1>
        <div >
          {this.state.todaysOrders.map(order => {
            if (order.foodType === "non-swallow") {
              return (
                < div className = "content-box" >
                  <span>Name: {order.user}</span>
                  <div>
                    {order.foodItems.map(food => (
                      <p>
                        {food[0]} - {food[1]}
                      </p>
                    ))}
                  </div>
                  <p>Food Type: {order.foodType}</p>
                  <p>Meal Price: {order.priceOfOrder}</p>
                  <span>
                    Has Plate: <input type="radio" />
                    Order Sorted: <input type="checkbox" />
                  </span>
                  <br />
                </div>
              );
            }
          })}
        </div>
        <div>
          {this.state.todaysOrders.map(order => {
            if (order.foodType === "swallow") {
              return (
                < div className = "content-box" >
                  <p>Name: {order.user}</p>
                  <div>
                    {order.foodItems.map(food => (
                      <p>
                        {food[0]} - {food[1]}
                      </p>
                    ))}
                  </div>
                  <p>Food Type: {order.foodType}</p>
                  <p>Meal Price: {order.priceOfOrder}</p>
                  <span>
                    Has Plate: <input type="radio" />
                    Order Sorted: <input type="checkbox" />
                  </span>
                  <br />
                </div>
              );
            }
          })}
        </div>
        <p>Total Price of Meals: {this.state.sumOfAllTodaysOrders}</p>
      </div>
    ) : (
      <div className="background">
        <h1>No Orders yet today</h1>
      </div>
    );
  }
}
export default App;
