import React, { Component } from "react";
import PhotoItem from "../../components/PhotoItem/PhotoItem";

export class PhotoStream extends Component {
  state = {
    photoAttributesArray: [],
    currentPage:0,
    pages: 10,
    photosPerPage: 10,
    scrolling: false
  };

  componentDidMount() {
    this.loadPhotos();
    this.scrollListener = window.addEventListener('scroll', (e)=>{
      this.handleScroll()
    })
  }

  loadPhotos = () => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          let parser = new DOMParser();
          let xml = parser.parseFromString(req.response, "application/xml");
          let xmlPhotoElements = xml.getElementsByTagName("photo");

          let photoAttributesArr = [];
          for (let i = 0; i < xmlPhotoElements.length; i++) {
            let photoObj = {};
            photoObj.id = xmlPhotoElements[i].getAttribute("id");
            photoObj.secret = xmlPhotoElements[i].getAttribute("secret");
            photoObj.server = xmlPhotoElements[i].getAttribute("server");
            photoObj.title = xmlPhotoElements[i].getAttribute("title");
            photoAttributesArr.push(photoObj);
          }
          this.setState({
            photoAttributesArray: [
              ...this.state.photoAttributesArray,
              ...photoAttributesArr,
            ],
            scrolling:false
          });
        }
      }
    };

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_KEY}&per_page=${this.state.photosPerPage}&page=${this.state.currentPage}&format=rest`;
    req.open("GET", url, true);
    req.send();
  };

  loadMore=()=>{
    this.setState(prevState=>({
      page: prevState.currentPage + 1,
      scrolling: true
    }), this.loadPhotos)
  }

  handleScroll=()=>{
    const {scrolling, pages, currentPage} = this.state
    if(scrolling) return
    if(pages<=currentPage) return
    const lastPhoto=document.querySelector('div.photos > img:last-child')
    const lastPhotoOffset=lastPhoto.offsetTop + lastPhoto.clientHeight
    const pageOffset=window.pageYOffset + window.innerHeight
    const bottomOffset=20
    if(pageOffset > lastPhotoOffset-bottomOffset) this.loadMore()   
  }

  createPhotoStream = () => {
    if (this.state.photoAttributesArray.length > 0) {
      return this.state.photoAttributesArray.map((photo, key) => (
        <PhotoItem
          server={photo.server}
          secret={photo.secret}
          id={photo.id}
          title={photo.title}
          key={key}
        />
      ));
    } else return [];
  };

  render() {
    return <div>
      <div className="photos"> {this.createPhotoStream()} </div>
    </div>;
  }
}

export default PhotoStream;
