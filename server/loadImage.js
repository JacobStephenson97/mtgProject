import { Meteor } from 'meteor/meteor';
import request from "request";
import https from "https";
import { Image } from "image-js";
import fetch from "node-fetch";

Meteor.methods({
  async getImage(url) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const b = new Buffer(buffer)
    return `data:image/jpeg;base64,${b.toString("base64")}`;
  }
})
