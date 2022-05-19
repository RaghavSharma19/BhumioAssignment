import React, { useState } from "react";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import styledComponents from "styled-components";
import { gapi } from "gapi-script";
import "./App.css";


var pick = require("google-picker")({
  clientId: process.env.REACT_APP_CLIENTID,
  apiKey: process.env.REACT_APP_APIKEY,
});

// creating button with hover animation 
const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  background-color: grey;
  padding: 12px 24px;
  border-radius: 8px;
  color: black;
  border-color: purple;
  margin: 0px 20px;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: #c0c0c0;
    transform: scale(1.1);
  }
`;

//wrapper for entire application
const Wrapper = styledComponents.div`
  text-align:center;
  position:relative;
  position:relative;
  justify-content:center;
  background-color:white;
`;

const Pline = styledComponents.p`
transform:translateX(-190px);
`;

const App = () => {
  const [items, setItems] = useState([]);//array of names of selected files initially set to 0 

  //handler for functions 
  const onGoogleConnect = () => {
    pick({ views: ["DocsView()"] }, function (err, files) {
      if (err) throw err;
      console.log(files);
      setItems([...items, files[0].name]);
    });
  };

  const onSelectFiles = () => {
    pick({ views: ["DocsView()"] }, function (err, files) {
      if (err) throw err;
      setItems([...items, files[0].name]);//adding and creating new array with all previous names

      // files
    });
  };

  return (
    <Wrapper>
      <CustomButton onClick={onGoogleConnect}>
        Connect to Google Drive
      </CustomButton>
      <CustomButton onClick={onSelectFiles}>
        Select File from Google Drive
      </CustomButton>
      <Pline>Selected File...</Pline>
      <div className="Container">
        {items &&
          items.map((item) => {
            return <ul>{item}</ul>;
          })}
      </div>
    </Wrapper>
  );
};

export default App;
