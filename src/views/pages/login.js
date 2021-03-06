// import external modules
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Button,
  Label,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";
import axios from "axios";
import Logo from "../../assets/img/dbs_logo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: true,
      loginEmail: "",
      loginPassword: "",
      persons: [],
      custId: "",
      accId: "",
      userName: ""
    };
  }

  handleChecked = e => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

  loginClick = e => {
    try {
      //Api call with parameters.
      //axios.get('https://site.com/?name=Flavio')
     // axios.get("https://site.com/", {
     //   params: {
     //     name: "Flavio"
     //   }
     // });
     const headers = {
      'identity': 'T7',
      'token': 'af1c9e83-266a-4c97-80fa-25c84e2f39fd'
      }
     let name = this.state.loginEmail;
     axios
       .get(`http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/${name}`,{headers})
       .then(res => {
         //check value
         const persons = res.data;
         this.state.custId = persons["customerId"];
         this.state.userName = persons["userName"];
         if (
          this.state.loginEmail == this.state.userName &&
          this.state.loginPassword == "12345678"
        ) {
          localStorage.setItem("custId", this.state.custId);

          axios
        .get(`http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/${this.state.custId}`,{headers})
        .then(res =>{
          const accDetails = res.data;
          this.state.accId = accDetails[0]["accountId"];
          localStorage.setItem("accId", this.state.accId);
          this.props.history.push("/analytics-dashboard");
        })
        .catch(error =>
          {
            console.log(error);
          })
        } else if (this.state.loginEmail == "" || this.state.loginPassword == "") {
          alert("Missing login information");
        } else if (this.state.loginEmail !== this.state.userName) {
          console.log("this "+this.state.userName);
          alert("Incorrect email address");
        } else if (this.state.loginPassword !== "12345678") {
          alert("Incorrect password");
        }
       })
       .catch(error => {
         alert("Incorrect email address");
    });
   } catch (e) {
     console.log(e);
   }
    
  };

  handleEmailChange = e => {
    this.setState({ loginEmail: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ loginPassword: e.target.value });
  };

  render() {
    // if (this.state.persons.length > 0) {
    //   console.log(this.state.persons[0]);
    // }
    return (
      <div className="container">
        <Row className="full-height-vh">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-center"
          >
            <Card className="gradient-celestial text-center width-400">
              <CardBody>
                <img src={Logo} height="42px" width="100px" alt="logo"></img>
                <h2 className="white py-4">Login</h2>

                <Form className="pt-2">
                  <FormGroup>
                    <Col md="12">
                      <Input
                        onChange={this.handleEmailChange}
                        type="email"
                        className="form-control"
                        name="inputEmail"
                        id="inputEmail"
                        placeholder="Email"
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col md="12">
                      <Input
                        onChange={this.handlePasswordChange}
                        type="password"
                        className="form-control"
                        name="inputPass"
                        id="inputPass"
                        placeholder="Password"
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
                          <Input
                            type="checkbox"
                            className="custom-control-input"
                            checked={this.state.isChecked}
                            onChange={this.handleChecked}
                            id="rememberme"
                          />
                          <Label
                            className="custom-control-label float-left white"
                            for="rememberme"
                          >
                            Remember Me
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Col md="12">
                      <Button
                        color="danger"
                        block
                        className="btn-pink btn-raised"
                        onClick={this.loginClick}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        block
                        className="btn-raised"
                      >
                        Cancel
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div className="float-left">
                  <NavLink to="/pages/forgot-password" className="text-white">
                    Forgot Password?
                  </NavLink>
                </div>
                <div className="float-right">
                  <NavLink to="/pages/register" className="text-white">
                    Register Now
                  </NavLink>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
