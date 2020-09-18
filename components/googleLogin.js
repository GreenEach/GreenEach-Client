import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import axios from "axios";
import { Cookies, withCookies } from "react-cookie";

const SocialLogin = ({ cookies }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const responseGoogle = (response) => {
    // console.log("응답", response.profileObj)
    axios
      .post("https://greeneachdomain.tk/sign/oauth", {
        email: response.profileObj.email,
        username: response.profileObj.name,
        password: response.profileObj.googleId,
      })
      .then((response) => {
        cookies.set("userInfo", response.data.token, { path: "/" });
      })
      .catch((err) => console.log(err));
  };

  const responseFail = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <GoogleLogin
        clientId="446913696862-141s7lv2o9t3391agctlbk9damctfhht.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseFail}
      ></GoogleLogin>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flew: column wrap;
`;
export default withCookies(SocialLogin);
