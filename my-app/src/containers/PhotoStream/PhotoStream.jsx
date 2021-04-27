import React, { Component, lazy, Suspence } from "react";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import "./PhotoStream.scss";

export class PhotoStream extends Component {
  state = {
    photoAttributesArray: [],
    currentPage: 0,
    pages: 1000,
    photosPerPage: 5,
    scrolling: false,
    error: "",
    loading: false,
  };

  componentDidMount() {
    this.loadPhotos();
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handleScroll();
    });
  }

  loadPhotos = () => {
    this.setState({ loading: true });
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_KEY}&per_page=${this.state.photosPerPage}&page=${this.state.currentPage}&format=rest`;
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          let parser = new DOMParser();
          let xml = parser.parseFromString(req.response, "application/xml");
          let xmlPhotoElements = xml.getElementsByTagName("photo");
          if (xml.getElementsByTagName("err").length !== 0) {
            let xmlRequestErrorMessage = xml
              .getElementsByTagName("err")[0]
              .getAttribute("msg");

            let xmlRequestStatus = xml
              .getElementsByTagName("rsp")[0]
              .getAttribute("stat");
            let xmlRequestErrorCode = xml
              .getElementsByTagName("err")[0]
              .getAttribute("code");
            this.setState({
              error:
                "Request status: " +
                xmlRequestStatus +
                " Error code: " +
                xmlRequestErrorCode +
                " Error message: " +
                xmlRequestErrorMessage,
            });
          } else {
            let photoAttributesArr = [];
            for (let i = 0; i < xmlPhotoElements.length; i++) {
              let photoObj = {};
              photoObj.id = xmlPhotoElements[i].getAttribute("id");
              photoObj.secret = xmlPhotoElements[i].getAttribute("secret");
              photoObj.server = xmlPhotoElements[i].getAttribute("server");
              photoObj.title = xmlPhotoElements[i].getAttribute("title");
              photoObj.author = xmlPhotoElements[i].getAttribute("owner");
              photoObj.url = `https://live.staticflickr.com/${xmlPhotoElements[i].getAttribute("server")}/${xmlPhotoElements[i].getAttribute("id")}_${xmlPhotoElements[i].getAttribute("secret")}_w.jpg`;
              photoAttributesArr.push(photoObj);
            }
            this.setState({
              photoAttributesArray: [
                ...this.state.photoAttributesArray,
                ...photoAttributesArr,
              ],
              scrolling: false,
              loading: false,
            });
          }
        }
      }
    };

    req.open("GET", url, true);
    req.onerror = () => {
      this.setState({
        error:
          "Error : request not sent. Please check request url and your internet connection.",
      });
    };
    req.send();
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.currentPage + 1,
        scrolling: true,
        loading: false,
      }),
      this.loadPhotos
    );
  };

  handleScroll = () => {
    const { scrolling, pages, currentPage } = this.state;
    if (scrolling) return;
    if (pages <= currentPage) return;
    const lastPhoto = document.querySelector("div.photos > div:last-child");
    const lastPhotoOffset = lastPhoto.offsetTop + lastPhoto.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 20;
    if (pageOffset > lastPhotoOffset - bottomOffset) this.loadMore();
  };

  createPhotoStream = () => {
    if (this.state.photoAttributesArray.length > 0) {
      return this.state.photoAttributesArray.map((photo, key) => (
        <PhotoItem
          url={photo.url}
          title={photo.title}
          author={photo.author}
          key={key}
        />
      ));
    } else return [];
  };

  createErrorMessage = () => {
    if (this.state.error.length > 0 && !this.state.loading) {
      return (
        <ErrorMessage
          error={this.state.error}
          errorType={"errorFetchingPhotos"}
        />
      );
    } else return null;
  };

  render() {
    return (
      <div>
        {this.createErrorMessage()}
        {this.state.loading ? <Spinner /> : null}
        <div
          className={
            this.state.photoAttributesArray.length > 0 ? "photos" : undefined
          }
        >
          {" "}
          {this.createPhotoStream()}{" "}
        </div>
      </div>
    );
  }
}

export default PhotoStream;
