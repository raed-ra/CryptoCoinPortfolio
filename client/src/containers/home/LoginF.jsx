import React from "react";
import "./Login.scss";
import { Login, Register } from "../../components/login/index";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  componentDidMount() {
    //Add .right by default
    // console.log(this);
  
    this.rightSide.classList.add("right");
    // console.log(this.rightSide);

  }

  changeState() {
    const { isLogginActive } = this.state;
    // console.log(isLogginActive);

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    // console.log(this.state);
  }

  render() {
    const { isLogginActive } = this.state;
    // console.log(isLogginActive);
    const current = isLogginActive ? "Register" : "Login";
    // console.log(current);
    const currentActive = isLogginActive ? "login" : "register";
    // console.log(currentActive);
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => {
            // console.log(this.container)
            // console.log(ref);
            (this.container = ref)
            // console.log(this.container)
            // console.log(this)
            }}>
            {isLogginActive && (
              <Login 
              containerRef={ref => {
                // console.log(ref);
                // console.log(this.current);
                (this.current = ref)
                // console.log(this.current);
              }
            } 
            />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => {
              // console.log(ref);
              // console.log(this.rightSide);
              (this.rightSide = ref)
              // console.log(this.rightSide);
              // console.log(this);
              // console.log(this.changeState);
            }
          }
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginForm;