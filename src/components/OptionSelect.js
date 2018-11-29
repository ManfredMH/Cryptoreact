import React,{Component} from 'react';

export default class OptionSelect extends Component {

    render() {
        const {id, name} = this.props.coin;
        return (
            <option value={id}>
                {name}
            </option>
        );
    }
}