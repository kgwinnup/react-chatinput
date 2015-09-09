
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var TextInput = React.createClass({
    mixins: [PureRenderMixin],

    _onEnter: function(event){
        if(event){
            event.preventDefault();
        }
        
        var textinput = React.findDOMNode(this.refs.textinput);
        this.props.onEnter(textinput.value);
        textinput.value = '';
    },

    render: function(){

        return(
            <div className='text-input'>
                <form className='form-wrapper' onSubmit={this._onEnter}>
                    <button type='button' onClick={this._onEnter}>+</button>
                    <input type='text' ref='textinput' />
                </form>
            </div>
        );
    }

});

var TextOutput = React.createClass({
    mixins: [PureRenderMixin],

    componentDidUpdate: function(){
        var scrollDiv = React.findDOMNode(this.refs.output);
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    },

    render: function(){

        var lines = this.props.lines.map(function(line){
            return(<div className='text-output-line'>{line}</div>)
        });

        return(
            <div className='text-output' ref='output'>
                {lines}
            </div>
        );
    }
});

exports.ChatInput = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){

        return (
            <div className='scroll-input'>
                <TextOutput lines={this.props.output} />
                <TextInput onEnter={this.props.onEnter} />
            </div>
        );
    }

});
