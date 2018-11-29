import React,{Component} from 'react';
import OptionSelect from './OptionSelect';

export default class Form extends Component {

    coinRef = React.createRef();
    cryptoRef = React.createRef();

    quoteCurrencies = (e) => {
        e.preventDefault();

        const quotation ={
            coin: this.coinRef.current.value,
            crypto: this.cryptoRef.current.value
        }

        this.props.getCryptoValues(quotation);
    }

    render() {
        return (
            <form onSubmit={this.quoteCurrencies} >
                <div className="form-group">
                    <label>Moneda:</label>
                    <select ref={this.coinRef} className="form-control">
                        <option value="" disabled defaultValue>Elige tu moneda</option>
                        <option value="USD">Dolar Estadounidense</option>
                        <option value="MXN">Peso Mexicano</option>
                        <option value="GBP">Libras</option>
                        <option value="EUR">Euros</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Criptomoneda:</label>
                    <select ref={this.cryptoRef} className="form-control">
                        {Object.keys(this.props.coins).map(key =>(
                            <OptionSelect key = {key} coin = {this.props.coins[key]} />
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Cotizar"/>
                </div>
            </form>
        );
    }
}