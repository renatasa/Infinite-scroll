import React, { Component } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { createErrorMessage } from "../../services/errorService";
import { createPhotoStream } from "../../services/photoService";
import { loadPhotos } from "../../api/flickrApi";
import "./PhotoStream.scss";

const constants = {
  totalNumberOfPages: 1000,
  firstPage: 0,
  photosPerPage: 5,
};

export class PhotoStream extends Component {
  state = {
    photoAttributesArray: [],
    currentPage: constants.currentPage,
    pages: constants.totalNumberOfPages,
    photosPerPage: constants.photosPerPage,
    scrolling: false,
    error: "",
    loading: false,
  };

  componentDidMount() {
    loadPhotos(
      this.startLoading,
      this.updateStateWithPhotoData,
      this.updateStateWithError,
      this.state.photosPerPage,
      this.state.currentPage,
      this.increametCurrentPageOnFirstLoad
    );
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handleScroll();
    });
  }
    

  increametCurrentPageOnFirstLoad = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  updateStateWithError = (error) => {
    this.setState({
      loading: false,
      error: error,
    });
  };

  updateStateWithPhotoData = (photoAttributesArr) => {
    this.setState({
      photoAttributesArray: [
        ...this.state.photoAttributesArray,
        ...photoAttributesArr,
      ],
      scrolling: false,
      loading: false,
    });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + 1,
        scrolling: true,
        loading: false,
      }),
      loadPhotos(
        this.startLoading,
        this.updateStateWithPhotoData,
        this.updateStateWithError,
        this.state.photosPerPage,
        this.state.currentPage
      )
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

  render() {
    return (
      <div data-test="component-PhotoStream">
        {createErrorMessage(this.state.error, this.state.loading)}
        {this.state.loading && !this.state.error ? <Spinner /> : null}

        <div
          className={
            this.state.photoAttributesArray.length > 0 ? "photos" : undefined
          }
        >
          {createPhotoStream(this.state.photoAttributesArray)}
        </div>
      </div>
    );
  }
}

export default PhotoStream;
