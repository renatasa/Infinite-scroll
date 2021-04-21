import React, { Component } from "react";
import PhotoItem from "../../components/PhotoItem/PhotoItem";

export class PhotoStream extends Component {
  state = {
    photoAttributesArray: [],
    pages: 10,
    photosPerPage: 10,
  };
  componentDidMount() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          console.log("good request");
          let parser = new DOMParser();
          let xml = parser.parseFromString(req.response, "application/xml");
          let xmlPhotoElements = xml.getElementsByTagName("photo");
          console.log(xml);

          let photoAttributesArr = [];
          for (let i = 0; i < xmlPhotoElements.length; i++) {
            let photoObj = {};
            photoObj.id = xmlPhotoElements[i].getAttribute("id");
            photoObj.secret = xmlPhotoElements[i].getAttribute("secret");
            photoObj.server = xmlPhotoElements[i].getAttribute("server");
            photoObj.title = xmlPhotoElements[i].getAttribute("title");
            photoAttributesArr.push(photoObj);
          }
          this.setState({ photoAttributesArray: photoAttributesArr });
        }
      }
    };

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_KEY}&per_page=${this.state.photosPerPage}&page=${this.state.pages}&format=rest`;
    req.open("GET", url, true);
    req.send();
  }

  createPhotoStream = () => {
    if (this.state.photoAttributesArray.length > 0) {
      return this.state.photoAttributesArray.map((photo) => (
        <PhotoItem
          server={photo.server}
          secret={photo.secret}
          id={photo.id}
          title={photo.title}
          key={photo.id}
        />
      ));
    } else return [];
  };

  render() {
    return <div>{this.createPhotoStream()}</div>;
  }
}

export default PhotoStream;
