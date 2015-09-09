basic react component for creating a chat room with input box

props:

+ output - is a list of something to be displayed. Can be strings or another react component.
+ onEnter - this is the function that takes receives the input on submit or enter.   


<ChatInput onEnter={this._onEnter} output={this.state.output} />

![chat](https://github.com/kgwinnup/react-chatinput/blob/master/chat.png)
