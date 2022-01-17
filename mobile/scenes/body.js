import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from '../components/auth/login';

class Body extends Component {
    constructor(props) {
		super(props);
        this.state = { };
    }

    render() {
        if (this.props.index===0) {
            return (
                <Login/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
      index: state.index,
    }
}
export default connect(mapStateToProps)(Body)