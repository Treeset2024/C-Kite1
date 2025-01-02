import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Default email
  const [phone, setPhone] = useState(""); // Default phone number
  const [instituteName, setInstituteName] = useState(""); 
  const [stream, setStream] = useState(""); // Make sure stream is initialized here
  const [degree, setDegree] = useState(""); // Make sure degree is initialized here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const setProfileData = ({ username, email, phone, profileImage, instituteName, stream, degree, firstName, lastName }) => {
    if (username) setUsername(username);
    if (firstName) setFirstName(firstName);
    if (lastName) setLastName(lastName);
    if (email) setEmail(email);
    if (phone) setPhone(phone);
    if (profileImage) setProfileImage(profileImage);
    if (instituteName) setInstituteName(instituteName);
    if (stream) setStream(stream); // Update stream
    if (degree) setDegree(degree);
  };

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        setProfileImage,
        username,
        setUsername,
        email,
        setEmail,
        phone,
        setPhone,
        instituteName, // Add instituteName to the context
        setInstituteName,
        stream, 
        setStream,  
        degree,  
        setDegree,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        setProfileData
      }}
    >
      {children}
    </ProfileContext.Provider>
    );
};