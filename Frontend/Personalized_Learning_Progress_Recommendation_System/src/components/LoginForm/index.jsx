

import { Component } from "react";
import BASE_URL from "../../api";
import "./index.css";

class LoginForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    isLogin: true,
    message: "",
  };

  toggleMode = () => {
    this.setState((prev) => ({
      isLogin: !prev.isLogin,
      message: "",
    }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    const { name, email, password, isLogin } = this.state;

    const url = isLogin
      ? `${BASE_URL}/auth/login`
      : `${BASE_URL}/auth/signup`;

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // ⭐ store user on login success
      if (data.user_id) {
  localStorage.setItem("user", JSON.stringify(data));
  window.location.href = "/"; // ⭐ redirect to home
}

      this.setState({ message: data.message || data.error });
    } catch (error) {
      console.error(error);
      this.setState({ message: "Something went wrong" });
    }
  };

  render() {
    const { name, email, password, isLogin, message } = this.state;

    return (
      <div className="login-container">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
            />
            <br /><br />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <br /><br />

        <button onClick={this.handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p style={{ marginTop: "10px", color: "green" }}>{message}</p>

        <p
          style={{ cursor: "pointer", color: "#2563eb" }}
          onClick={this.toggleMode}
        >
          {isLogin
            ? "New user? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    );
  }
}

export default LoginForm;