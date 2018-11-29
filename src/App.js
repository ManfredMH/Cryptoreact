import React, { Component } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import axios from 'axios';
import Result from './components/Result';

class App extends Component {

  state = {
    coins: [],
    quotation: {},
    quoteCoin: '',
    loading: false
  }

 componentDidMount(){
   this.getCoins();
 }

  getCoins = async () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;
    await axios.get(url)
    .then(response => {
      this.setState({
        coins: response.data.data
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  getCryptoValues = async (coins) => {
    const {coin, crypto} = coins;

    const url = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${coin}`;

    await axios.get(url)
     .then(response => {
       this.setState({
         loading: true
       });
      setTimeout(() => {
        this.setState({
          quotation: response.data.data,
          quoteCoin: coin,
          loading: false
        });
      }, 2000);
    });
  }

  render() {

    const loading = this.state.loading;

    let result;

    if(loading){
      result = <div className="spinner">
                  <div className="cube1"></div>
                  <div className="cube2"></div>
                </div>
    } else {
      result = <Result quotation={this.state.quotation} quoteCoin={this.state.quoteCoin} />;
    }

    return (
      <div className="container">
        <Header title = "Cotizador de Criptomonedas" />
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light pb-4 principal-container">
            <Form coins = {this.state.coins} getCryptoValues={this.getCryptoValues} />
            {result}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
