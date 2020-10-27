import React, { useState } from "react";
import { Meteor } from 'meteor/meteor';

export const Logout = () => (
  <div className="logout-container">
    <button className="logout" onClick={() => Meteor.logout()}>Logout</button>
  </div>
)