<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">mtgProject</h3>

  <p align="center">
    A MTG deckbuilding webapp
    <br />
    <a href="https://github.com/JacobStephenson97/mtgProject/issues">Report Bug</a>
    ·
    <a href="https://github.com/JacobStephenson97/mtgProject/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project


A new project using a MERN stack to deliver an easy to use MTG deckbuilding website 

### Built With

* [MaterialUI](https://material-ui.com)
* [Nodejs](https://nodejs.org/en)
* [React](https://reactjs.org)
* [Expressjs](https://expressjs.com/)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone -b newBackend https://github.com/JacobStephenson97/mtgProject.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

Create a local Mongodb instance for yourself or contact me for access to my currrent one. 

If you have access to the mongoDB atlas, log in [here](https://cloud.mongodb.com/)

Click connect: ![Mongo connect Screenshot][connect-screenshot]

Copy the URI from either of the second option (Connect your application), it should look like:
```
mongodb+srv://<username>:<password>@cluster0.nhwp5.mongodb.net/<DATABASE>?retryWrites=true&w=majority";
```
Enter your username and password, as well as change "MyFirstDatabase" to mtgproject in the DATABASE part of the URI.

Enter your API in `server/index.js`
   ```JS
   const MONGO_URI = "URI";
   ```
as well as in `server/db/index.js`
    ```JS
    const uri = "URI";
    ```

*To be updated*



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Jacob Stephenson - Jacob@Jacobstephenson.ca

Project Link: [https://github.com/JacobStephenson97/mtgProject](https://github.com/JacobStephenson97/mtgProject)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements


*To be updated*





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[connect-screenshot]: images/mongodbconnect.png