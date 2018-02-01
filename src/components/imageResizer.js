import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './imageResizer.css';

export class ImageResizer extends Component {
    constructor(props) {
        super(props);
    }

    cropFinish() {
        const img = this.refs.cropper.getCroppedCanvas().toDataURL();
        this.props.onResized(img);
    }

    render () {
        return (
        <div className='image-crop-popup'>
            <div className="image-crop-popup__body">
            <div className="image-crop-popup__header">
                <p>Crop image please</p>
            </div>
                <div className="image-crop-popup__crop">
                    <Cropper
                        ref='cropper'
                        src={this.props.src}
                        style={{height: 400, width: 400, margin: 'auto'}}
                        // Cropper.js optionsnpm st
                        aspectRatio={1}
                        guides={false} />
                </div>
                <div className="image-crop-popup__buttons">
                    <button className="image-crop-popup__button" onClick={this.cropFinish.bind(this)}>Crop</button>
                </div>
            </div>
        </div>
        );
    }
}