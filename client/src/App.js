import React from "react";
import config from "./config";
import io from "socket.io-client";
import ChatBar from "./ChatBar";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: "",
      name: "Anonymous",
    };
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    this.socket.on("init", (msg) => {
      this.setState(
        (state) => ({
          chat: [...state.chat, ...msg].reverse(),
        }),
        this.scrollToBottom
      );
    });

    this.socket.on("push", (msg) => {
      this.setState(
        (state) => ({
          chat: [...state.chat, msg],
        }),
        this.scrollToBottom
      );
    });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState((state) => {
      this.socket.emit("message", {
        name: state.name,
        content: state.content,
      });

      return {
        chat: [
          ...state.chat,
          {
            name: state.name,
            content: state.content,
          },
        ],
        content: "",
      };
    }, this.scrollToBottom);
  }

  scrollToBottom() {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div className="App">
        <div id="chat" elevation={3}>
          {this.state.chat.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  this.state.name !== item.name ? "message" : "myMessage"
                }
              >
                <div className={"name"}>{item.name}</div>
                <div className={"content"}>{item.content}</div>
              </div>
            );
          })}
        </div>
        <ChatBar
          content={this.state.content}
          handleContent={this.handleContent.bind(this)}
          handleName={this.handleName.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          name={this.state.name}
        />
      </div>
    );
  }
}

export default App;
