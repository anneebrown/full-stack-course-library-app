import React, {Component} from 'react';
import logo from './rickastleydancing.gif';

export default class NotFound extends Component {
    render() {
        return(
            <div className="bounds">
            <h1><span role="img" aria-label="musicnote">♪</span>Never gonna give you up, never gonna let you down... <span role="img" aria-label="musicnote">♪</span></h1>
            <p>Except right now because the page you were looking for was not found. Sorry!</p>
            <img src={logo} alt='you have been rick rolled' />
          </div>
        )
    }
}