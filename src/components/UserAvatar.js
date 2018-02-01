import React, {Component} from 'react';
import './UserAvatar.css';

const DEF_USER_AVATAR = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

export class UserAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.src || DEF_USER_AVATAR,
        };
    }
    fileUploaded({target: {files}}) {
        const reader = new FileReader();
        reader.onload = ({target: {result}}) => {
            this.props.onImageUploaded(result);
        };
        reader.readAsDataURL(files[0]);
    }
    componentWillReceiveProps(props) {
        this.state = {
            src: props.src || DEF_USER_AVATAR,
        };
    }
    render() {
        return (
            <div className={`avatar ` + (this.state.src ? 'enabled' : '')}>
                <img src={this.state.src} />
                <input type="file" onChange={this.fileUploaded.bind(this)}/>
            </div>
        )
    }
}