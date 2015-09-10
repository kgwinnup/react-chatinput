
var React = require('react');
var ChatInput = require('./chatinput.jsx').ChatInput;

require('./chatinput.scss');
require('./index.html');

var Demo = React.createClass({

    getInitialState: function(){
        return {
            output: ['line 1', 'line 2', 'line 3', 'line 1', 'line 2', 'line 1', 'line 2', 'line 3', 'line 1', 'line 2', 'line 3']
        };
    },

    _onEnter: function(line){
        this.setState({
            output: this.state.output.concat(line)
        });
    },

    render: function(){

        var options = ['option 1', 'option 2'];

        return(
            <ChatInput onEnter={this._onEnter}
                       output={this.state.output}
                       option={options}/>
        )
    }
});

React.render(<Demo />, document.getElementById('app'));
