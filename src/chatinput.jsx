
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

/*
    display box that is popped up when a user clicks the button on the left of
    text input field
*/
var ChatOptions = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){

        // define basic properties for displaying
        var styles = {
            display: (this.props.show) ? 'block' : 'none',
            bottom: '4px'
        }

        //loop over eacy item in the option prop and put it into its own block
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

/*
    handles displayign the textbox and button
*/
var TextInput = React.createClass({
    mixins: [PureRenderMixin],

    //capture submit and prevent it. Send current input value to onEnter prop
    _onEnter: function(event){
        if(event){
            event.preventDefault();
        }

        var textinput = React.findDOMNode(this.refs.textinput);
        this.props.onEnter(textinput.value);
        textinput.value = '';
    },

    // show/hide options box
    _onMouseDown: function(event){
        this.props.toggleOptions();
    },

    render: function(){

        return(
            <div className='text-input'>

                <ChatOptions show={this.props.showOptions} option={this.props.option} />

                <form className='form-wrapper' onSubmit={this._onEnter}>
                    <button type='button' onMouseDown={this._onMouseDown} ref='button'>+</button>
                    <input type='text' ref='textinput' onFocus={this.props.hideOptions} />
                </form>

            </div>
        );
    }

});

/*
    displays all the output from the chat
*/
var TextOutput = React.createClass({
    mixins: [PureRenderMixin],

    //set scrollbar to always be at the bottom
    componentDidUpdate: function(){
        var scrollDiv = React.findDOMNode(this.refs.output);
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    },

    //hide options box
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

/*
    entry to main component
*/
exports.ChatInput = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function(){
        return {
            showOptions: false
        }
    },

    _hideOptions: function(){
        this.setState({
            showOptions: false
        });
    },

    _toggleOptions: function(){
        this.setState({
            showOptions: !this.state.showOptions
        });
    },

    render: function(){

        return (
            <div className='scroll-input'>
                <TextOutput lines={this.props.output} onClick={this._hideOptions} />
                <TextInput showOptions={this.state.showOptions}
                           onEnter={this.props.onEnter}
                           toggleOptions={this._toggleOptions}
                           hideOptions={this._hideOptions}
                           option={this.props.option} />
            </div>
        );
    }

});
