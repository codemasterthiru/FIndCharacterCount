/**
 * importing react components, configs, and styles css file to use inside this component
 */
import React from "react";
import { hostUrl, challengeUrl, getInputUrl, getOutputUrl } from "../config";
import "./styles.css";

/**
 * declartion of headerParams as global variable
 */
const headerParams = new Headers({
  userId: "Ip81iFNacx",
  "Content-Type": "application/json"
});

/**
 * FIndCharacterCount class declartion and initialization
 */
class FindCharacterCount extends React.Component {
  state = {
    data: {},
    input: "",
    output: "",
    count: 0
  };
  /**
   * componentWillMount is used to call in initial stage of the class component call
   */
  componentWillMount() {
    this.fetchChallenge();
    this.fetchInput();
  }
  /**
   * fetchChallenge is used to get the sample data from the API,
   * and make use of the retrived data by rendering simple html tags in render method
   */
  fetchChallenge = async () => {
    const result = await fetch(hostUrl + challengeUrl, {
      method: "get",
      headers: headerParams
    }).then(function(response) {
      return response.json();
    });
    this.setState({
      data: result
    });
  };
  /**
   * fetchInput is used to get the input data from the API
   */
  fetchInput = async () => {
    const result = await fetch(hostUrl + challengeUrl + getInputUrl, {
      method: "get",
      headers: headerParams
    }).then(function(response) {
      return response.json();
    });
    const stringCount = result.text.length;
    const bodyParams = { count: stringCount };
    this.fetchOutput(bodyParams);
    this.setState({
      count: stringCount,
      input: result
    });
  };
  /**
   * fetchOutput is used to get the output data from the API
   */
  fetchOutput = async bodyParams => {
    const result = await fetch(hostUrl + challengeUrl + getOutputUrl, {
      method: "post",
      headers: headerParams,
      body: JSON.stringify(bodyParams)
    })
      .then(function(response) {
        return response.json();
      })
      .error(function(response) {
        return response.json();
      });
    this.setState({
      output: result
    });
  };
  onClick = () => {
    this.fetchInput();
  };
  /***
   * Default render method of FindCharacterCount class
   */
  render() {
    return (
      <>
        <div className={"header"}>{"Http Hunt Game"}</div>
        <div className={"stage"}>Stage: {this.state.data.stage}</div>
        <div className={"statement"}>
          Statement: {this.state.data.statement}
        </div>
        <div className={"instructions"}>
          Instructions: {this.state.data.instructions}
        </div>
        <div className={"inputs"}>Input: {this.state.input}</div>
        <div className={"output"}>Output: {this.state.output}</div>
        <button onClick={this.onClick} className={"inputButton"}>
          {"Try with different Input"}
        </button>
      </>
    );
  }
}

/**
 * exporting FindCharacterCount class to call anywhere,
 * by simply import this class
 */
export { FindCharacterCount };
export default { FindCharacterCount };
