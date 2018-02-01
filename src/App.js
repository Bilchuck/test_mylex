import React, { Component } from 'react';
import { ImageResizer } from './components/imageResizer';
import { UserAvatar } from './components/UserAvatar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpenPopup: false,
      errorMessage: null,
      userAvatar: null,
    }
  }
  onImageUploaded(imageBase64) {
    const i = new Image();
    i.src = imageBase64;
    i.onload = () => {
      if (i.width >= 300 && i.height >= 300) {
        if (i.width === 300 && i.height === 300) {
          this.sendImage(imageBase64);
        } else {
          this.openResizePopup(imageBase64);
        }
      } else {
        this.setState({
          errorMessage: `Image should me at least 300x300px`
        });
      }
    }
  }
  openResizePopup(image) {
    this.imageBase64 = image;
    this.setState({
      isOpenPopup: true,
    });
  }
  sendImage (img) {
    fetch('/img', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img,
      })
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        userAvatar: result.img,
        isOpenPopup: false,
      });
    });
  }
  onResize(img) {
    this.sendImage(img);
  }
  errorMessage() {
    if (this.state.errorMessage) {
      return <p className='error-message'>{this.state.errorMessage}</p>;
    } else {
      return null;
    }
  }
  imageResizer() {
    if (this.state.isOpenPopup ) {
      return <ImageResizer src={this.imageBase64} onResized={this.onResize.bind(this)}/>
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <h1>
          Text exersice
        </h1>
        <UserAvatar onImageUploaded={this.onImageUploaded.bind(this)} src={this.state.userAvatar}/>
        {this.imageResizer()}
        {this.errorMessage()}
      </div>
    );
  }
}

export default App;
