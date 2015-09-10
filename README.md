basic react component for creating a chat room with input box

props:

+ output - is a list of something to be displayed. Can be strings or another react component.
+ onEnter - this is the function that takes receives the input on submit or enter.   
+ options - list of special options to display when the '+' button is clicked

<ChatInput onEnter={this._onEnter}
           output={this.state.output}
           option={options}/>

![chat1](https://github.com/kgwinnup/react-chatinput/blob/master/chat1.png)
![chat2](https://github.com/kgwinnup/react-chatinput/blob/master/chat2.png)
