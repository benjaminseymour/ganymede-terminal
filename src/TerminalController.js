import React, { useState } from "react";
import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "react-terminal-ui";

import users from "./data/users.json";
import captainsLogs from "./data/captainsLogs.json";

const defaultTerminalOutput = [
  <TerminalOutput>
    Welcome to the Starship Icarus Emergency Terminal.
  </TerminalOutput>,
  <TerminalOutput>
    Please refer to the Starship Icarus Emergency Terminal Manual for guidance.
  </TerminalOutput>,
  <TerminalOutput>
    The following general commands are available:
  </TerminalOutput>,
  <TerminalOutput>'clear' will clear the terminal</TerminalOutput>,
];

const unauthorisedOutput =
  "Unauthorised. Please refer to the Starship Icarus Emergency Terminal Manual for guidance.";

const TerminalController = () => {
  const [terminalLineData, setTerminalLineData] = useState(
    defaultTerminalOutput
  );
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  
  const [accessLogData, setAccessLogData] = useState([]);

  const outputBuffer = [];
  const accessLogBuffer = [];

  const checkGrant = (grant) => {
    if (userLoggedIn === null) {
      return false;
    }

    if (!userLoggedIn.grants === undefined) {
      return false;
    }

    if (!userLoggedIn.grants?.includes(grant)) {
      return false;
    }

    return true;
  };

  const printInput = (text) => {
    outputBuffer.push(<TerminalInput>{text}</TerminalInput>);
  };

  const printOutput = (text) => {
    outputBuffer.push(<TerminalOutput>{text}</TerminalOutput>);
  };

  const addAccessLog = (text) => {
    var date = new Date();
    var newDate = new Date(date.setFullYear(date.getFullYear() + 100));
    accessLogBuffer.push(`${newDate.toISOString()} - ${text}`);
  }

  const updateUi = () => {
    const lineData = [...terminalLineData];
    outputBuffer.forEach((line) => lineData.push(line));
    setTerminalLineData(lineData);
    
    const accessData = [...accessLogData];
    accessLogBuffer.forEach((line) => accessData.push(line));
    setAccessLogData(accessData);
  };

  const printUnauthorised = () => {
    printOutput(unauthorisedOutput);
  };

  const clear = () => {
    setTerminalLineData(defaultTerminalOutput);
  };

  const findUser = (userId) => {
    if (userId === undefined) {
      printOutput("A User Id must be provided.");
      return null;
    }

    const user = users.find((user) => user.id === userId);

    if (user === undefined) {
      printOutput(`Unable to find user with User Id '${userId}'.`);
      return null;
    }

    return user;
  }

  const login = (userId) => {
    const user = findUser(userId);

    if (user !== null) {
      setUserLoggedIn(user);
      printOutput(`Successfully logged in! Welcome ${user.name}!`);
      addAccessLog(`${user.name} successfully logged in.`)
    } else {
      addAccessLog(`Failed login attempt with User Id ${userId}.`)
    }
  };

  const logout = () => {
    if (userLoggedIn === null) {
      printOutput("No user currently logged in!");
      addAccessLog(`Failed logout attempt.`)
    } else {      
      addAccessLog(`${userLoggedIn.name} successfully logged out.`)
      printOutput("Logging out...");
      setUserLoggedIn(null);
      printOutput("Successfully logged out!");      
    }
  };

  const captainsLog = (logId) => {
    if (!checkGrant("captains-log:read")) {
      addAccessLog(`Unauthorised access to captain's log denied.`)
      printUnauthorised();
    } else if (logId === undefined) {
      captainsLogList();
    } else {
      captainsLogDetail();
    }
  };

  const captainsLogList = () => {    
    addAccessLog(`User ${userLoggedIn.name} accessed captain's log list.`)
    captainsLogs.forEach((log) => {
      printOutput(
        `Id: ${log.id}, DateTime: ${log.datetime}, Title: ${log.title}`
      );
    });
  };  

  const captainsLogDetail = (logId) => {
    const log = captainsLogs.find((log) => log.id === logId);

    if (log === null) {      
      addAccessLog(`User ${userLoggedIn.name} attempted to access captain's log detail id ${logId}.`)
      printOutput(`Captain's log with Id '${logId}' not found.`);
    } else {      
      addAccessLog(`User ${userLoggedIn.name} accessed captain's log detail id ${logId}.`)
      printOutput(log.datetime);
      printOutput(log.title);
      printOutput(log.detail);
    }
  };

  const accessLog = () => {
    if (!checkGrant("access-log:read")) {
      addAccessLog(`Unauthorised access to access logs denied.`)
      printUnauthorised();
    } else {      
      addAccessLog(`User ${userLoggedIn.name} accessed access logs.`)
      accessLogData.forEach(log => printOutput(log))
    }
  }

  const shipManifest = (userId) => {
    if (!checkGrant("ship-manifest:read")) {
      addAccessLog(`Unauthorised access to ship manifest denied.`)
      printUnauthorised();
    } else {      
      const user = findUser(userId);

      if (user !== null) {        
        const manifest = user.manifest 

        if (manifest !== undefined) {          
          printOutput(`Manifest records for ${user.name}`);       
          addAccessLog(`User ${userLoggedIn.name} accessed manifest records for ${user.name}.`)
          if (manifest.embarked !== undefined) { printOutput(`Embarked: ${manifest.embarked}`); }
          if (manifest.cargo !== undefined) { printOutput(`Cargo: ${manifest.cargo}`); }
          if (manifest.captainsNotes !== undefined) { printOutput(`Captain's Notes: ${manifest.captainsNotes}`); }
        } else {     
          addAccessLog(`User ${userLoggedIn.name} attempted to access manifest records for ${user.name}.`)     
          printOutput(`No manifest records available for ${user.name}.`);
        }
      }
    }
  }  

  const medicalRecord = (userId) => {
    if (!checkGrant("medical-record:read")) {
      addAccessLog(`Unauthorised access to medical records denied.`)
      printUnauthorised();
    } else {
      const user = findUser(userId);

      if (user !== null) {        
        const medical = user.medical 

        if (medical !== undefined) {          
          printOutput(`Medical records for ${user.name}`);          
          addAccessLog(`User ${userLoggedIn.name} accessed medical records for ${user.name}.`)
          if (medical.bloodType !== undefined) { printOutput(`Blood type: ${medical.bloodType}`); }
          if (medical.geneticRiskMarkers !== undefined) { printOutput(`Genetic risk markers: ${medical.geneticRiskMarkers}`); }
          if (medical.bodyScanResults !== undefined) { printOutput(`Body scan results: ${medical.bodyScanResults}`); }
          if (medical.medicalOfficersNotes !== undefined) { printOutput(`Medical officer's notes: ${medical.medicalOfficersNotes}`); }
        } else {     
          addAccessLog(`User ${userLoggedIn.name} attempted to access medical records for ${user.name}.`)     
          printOutput(`No medical records available for ${user.name}.`);
        }
      }
    }
  }

  const onInput = (input) => {
    printInput(input);

    const tokens = input.trim().split(" ");
    const command = tokens[0]?.toLocaleLowerCase();
    const parameter = tokens[1]?.toLocaleUpperCase();;

    if (command === "login") {
      login(parameter);
    } else if (command === "logout") {
      logout();
    } else if (command === "access-log") {
      accessLog();
    } else if (command === "ship-manifest") {
      shipManifest(parameter);
    } else if (command === "medical-record") {
      medicalRecord(parameter);
    } else if (command === "captains-log") {
      captainsLog(parameter);      
    } else if (command === "") {
    } else {
      printOutput(`Command '${command}' is invalid. Please refer to the Starship Icarus Emergency Terminal Manual for guidance.`)
    }

    updateUi();

    if (command === "clear") {
      clear();
    }
  };

  return (
    <div className="container">
      <Terminal
        name="Starship Icarus Emergency Terminal"
        height="100vh"
        colorMode={ColorMode.Dark}
        onInput={onInput}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default TerminalController;
