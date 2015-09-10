
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ChatOptions = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){

        var styles = {
            display: (this.props.show) ? 'block' : 'none',
            bottom: '4px'
        }

        var opts = this.props.option.map(function(item){
            return(<div>{item}</div>);
        });

        return(
            <div style={styles} className='chat-options' ref='options'>
                {opts}
            </div>
        );
    }
});

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

    _onMouseDown: function(event){
        this.props.onMouseDownButton();
    },

    render: function(){

        return(
            <div className='text-input'>

                <ChatOptions show={this.props.showOptions} option={this.props.option} />

                <form className='form-wrapper' onSubmit={this._onEnter}>
                    <button type='button' onMouseDown={this._onMouseDown} ref='button'>+</button>
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

    _onClick: function(){
        this.props.onClick()
    },

    render: function(){

        var lines = this.props.lines.map(function(line){
            return(<div className='text-output-line'>{line}</div>)
        });

        return(
            <div className='text-output' ref='output' onClick={this._onClick} >
                {lines}
            </div>
        );
    }
});

exports.ChatInput = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function(){
        return {
            showOptions: false
        }
    },

    _onMouseClick: function(){
        this.setState({
            showOptions: false
        });
    },

    _onMouseDownButton: function(){
        this.setState({
            showOptions: !this.state.showOptions
        });
    },

    render: function(){

        return (
            <div className='scroll-input'>
                <TextOutput lines={this.props.output} onClick={this._onMouseClick} />
                <TextInput showOptions={this.state.showOptions}
                           onEnter={this.props.onEnter}
                           onMouseDownButton={this._onMouseDownButton}
                           option={this.props.option} />
            </div>
        );
    }

});
