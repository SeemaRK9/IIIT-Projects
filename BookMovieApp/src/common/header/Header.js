import React, { Fragment, useState } from "react";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Logo from "../../assets/logo.svg";
import "./Header.css";
import Tab from "@material-ui/core/Tab";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("access-token") == null ? false : true
  );
  const [userLoginFormValues, setUserLoginFormValues] = useState({
    username: "",
    password: "",
  });
  const [userRegisterFormValues, setUserRegisterFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    registerPassword: "",
    contact: "",
  });
  const [userNmReqd, setUserNmReqd] = useState(false);
  const [loginPwdReqd, setLoginPwdReqd] = useState(false);
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [ModalTab, setModalTab] = useState(0);
  const handleCloseRegisterModal = () => setOpenRegistrationModal(false);
  const [fNameReqd, setfNameReqd] = useState(false);
  const [lNameReqd, setlNameReqd] = useState(false);
  const [emailReqd, setEmailReqd] = useState(false);
  const [registrationSuccess, setSuccessRegistration] = useState(false);
  const [contactReqd, setContactReqd] = useState(false);
  const [registerPwdReqd, setRegisterPwdReqd] = useState(false);

  const onSubmitLogin = (e) => {
    e.preventDefault();
    setUserNmReqd(userLoginFormValues.username === "" ? true : false);
    setLoginPwdReqd(userLoginFormValues.password === "" ? true : false);

    fetch(props.baseUrl + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization:
          "Basic " +
          window.btoa(
            userLoginFormValues.username + ":" + userLoginFormValues.password
          ),
      },
    })
      .then((response) => {
        sessionStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        return response.json();
      })
      .then((response) => {
        if (response.status === "ACTIVE") {
          setLoggedIn(true);
          handleCloseRegisterModal();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleTabChange = (event, newValue) => {
    setModalTab(newValue);
  };

  const onRegistration = (e) => {
    e.preventDefault();

    setfNameReqd(userRegisterFormValues.fname === "" ? true : false);
    setlNameReqd(userRegisterFormValues.lname === "" ? true : false);
    setEmailReqd(userRegisterFormValues.email === "" ? true : false);
    setRegisterPwdReqd(
      userRegisterFormValues.registerPassword === "" ? true : false
    );
    setContactReqd(userRegisterFormValues.contact === "" ? true : false);
    let signupData = JSON.stringify({
      first_name: userRegisterFormValues.fname,
      last_name: userRegisterFormValues.lname,
      email_address: userRegisterFormValues.email,
      mobile_number: userRegisterFormValues.contact,
      password: userRegisterFormValues.registerPassword,
    });

    fetch(props.baseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: signupData,
    })
      .then((response) => response.json())
      .then((response) => {
        setSuccessRegistration(response.status === "ACTIVE" ? true : false);
      });
  };

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("access-token");
    setLoggedIn(false);
  };

  return (
    <Fragment>
      <div className="header">
        <img className="app-logo" src={Logo} alt="logo" />
        {/* <Button variant="contained" style={{ marginLeft: "auto" }}>
        Login
      </Button> */}
        {loggedIn ? (
          <Button
            onClick={(e) => logout(e)}
            variant="contained"
            style={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={(e) => setOpenRegistrationModal(true)}
            variant="contained"
            style={{ marginLeft: "auto" }}
          >
            Login
          </Button>
        )}
        {props.displayBookShowBtn === true && !loggedIn ? (
          <div className="bookshow-btn">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setOpenRegistrationModal(true)}
            >
              Book Show
            </Button>
          </div>
        ) : (
          ""
        )}
        {props.displayBookShowBtn === true && loggedIn ? (
          <div className="bookshow-btn">
            <Link to={"/bookshow/" + props.id}>
              <Button variant="contained" color="primary">
                Book Show
              </Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={openRegistrationModal}
        contentLabel="Login"
        onRequestClose={handleCloseRegisterModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Tabs
          style={{ marginBottom: "20px" }}
          value={ModalTab}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab disableFocusRipple label="LOGIN" />
          <Tab disableFocusRipple label="REGISTER" />
        </Tabs>
        {ModalTab === 0 && (
          <div style={{ padding: 0, textAlign: "center" }}>
            <FormControl required>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                type="text"
                value={userLoginFormValues.username}
                onChange={(e) => {
                  setUserLoginFormValues({
                    ...userLoginFormValues,
                    username: e.target.value,
                  });
                }}
              />
              {userNmReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="loginPassword">Password</InputLabel>
              <Input
                id="loginPassword"
                type="password"
                value={userLoginFormValues.password}
                onChange={(e) => {
                  setUserLoginFormValues({
                    ...userLoginFormValues,
                    password: e.target.value,
                  });
                }}
              />
              {loginPwdReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            {loggedIn === true && (
              <FormControl>
                <span className="successText">Login Successful!</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={onSubmitLogin}>
              LOGIN
            </Button>
          </div>
        )}

        {ModalTab === 1 && (
          <div style={{ padding: 0, textAlign: "center" }}>
            <FormControl required>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input
                id="firstname"
                type="text"
                value={userRegisterFormValues.fname}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    fname: e.target.value,
                  });
                }}
              />
              {fNameReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input
                id="lastname"
                type="text"
                value={userRegisterFormValues.lname}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    lname: e.target.value,
                  });
                }}
              />
              {lNameReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                value={userRegisterFormValues.email}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    email: e.target.value,
                  });
                }}
              />
              {emailReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="registerPassword">Password</InputLabel>
              <Input
                id="registerPassword"
                type="password"
                value={userRegisterFormValues.registerPassword}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    registerPassword: e.target.value,
                  });
                }}
              />
              {registerPwdReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="contact">Contact No.</InputLabel>
              <Input
                id="contact"
                type="text"
                value={userRegisterFormValues.contact}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    contact: e.target.value,
                  });
                }}
              />
              {contactReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            {registrationSuccess === true && (
              <FormControl>
                <span>Registration Successful. Please Login!</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={onRegistration}
            >
              REGISTER
            </Button>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default Header;
