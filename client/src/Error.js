import React, {Component} from 'react';

//renders a short error message if there was an unexpected error
export default class NotFound extends Component {
    render() {
        return(
            <div className="bounds">
            <p>Sorry, there was an unexpected error</p>
          </div>
        )
    }
}