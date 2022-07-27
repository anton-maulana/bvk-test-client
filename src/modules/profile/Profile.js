import React, { Component } from 'react';
import './Profile.css';
import noImage from '../../img/no-image.png';
import { Link } from 'react-router-dom';
import { updateProfiles, getCurrentUser } from '../../services/user.service';
import { API_BASE_URL } from '../../constants';


import Alert from 'react-s-alert';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repeat_password: '',
            position: '',
            reports_to: '',
            image: '',
            temp_image: ''
        }
    }

    setInput(entityName, value) {
        this.setState({ [entityName]: value })
    }

    componentDidMount() {
        this.setState({
            'name': this.props.currentUser.name,
            'email': this.props.currentUser.email
        })

        this.loadCurrentlyLoggedInUser()
    }

    loadCurrentlyLoggedInUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    name: response.name,
                    position: response.position
                })
            }).catch(error => {
            });
    }


    updateProfile() {
        let body = new FormData();
        Object.keys(this.state).forEach(key => {
            if (key == "image" || key == "temp_image") {
                if (!!this.state.image) {
                    body.append(key, this.state[key])
                }
            }
            else
                body.append(key, this.state[key]);
        })
        updateProfiles(body)
            .then(response => {
                console.log(response)
                Alert.success("You're successfully update profile.");
                this.loadCurrentlyLoggedInUser()
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });

    }

    openSelectImage() {
        let elem = document.getElementById("input-image");
        elem.click();
    }

    selectImage(event) {
        let files = event.target.files;

        if (files.length !== 0) {
            this.setState({'image': files[0], temp_image: URL.createObjectURL(files[0])})            
        }
    }

    showImage() {
        if (!!this.state.temp_image) {
            return (<img className="rounded-circle mt-5" src={this.state.temp_image} alt={this.props.currentUser.name} referrerPolicy="no-referrer" width="90" />)
        } else {
            let imageUrl = this.props.currentUser.imageUrl;
            if (!!this.props.currentUser.imageUrl) {
                if (!this.props.currentUser.imageUrl.startsWith("http")) {
                    imageUrl = API_BASE_URL+"/"+imageUrl;
                }
            }
            return (<img className="rounded-circle mt-5" src={imageUrl || noImage} alt={this.props.currentUser.name} referrerPolicy="no-referrer" width="90" />)
        }
    }

    render() {
        let s = this.state;

        return (
            <div className="container rounded mt-5" style={{ background: "#f1f1f1dd" }}>
                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <div style={{display: "flex", flexDirection: "column"}}>
                                {this.showImage()}
                                <button type="button" onClick={() => this.openSelectImage()} className="btn btn-primary btn-sm" style={{height: "27px"}}>update</button>
                            </div>
                            <span className="font-weight-bold">{this.props.currentUser.name}</span>
                            <span className="text-black-50">{this.props.currentUser.email}</span>
                            <input accept="image/*"  type="file" id="input-image" style={{visibility: 'hidden'}} onChange={(e) => this.selectImage(e)}/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                    <h6><Link style={{ textDecoration: "none" }} to="/" className="app-title">Back to home</Link></h6>
                                </div>
                                <h6 className="text-right">Edit Profile</h6>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="first name" value={s.name} onChange={e => this.setInput('name', e.target.value)} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Position</label>
                                    <input type="text" className="form-control" value={s.position} onChange={e => this.setInput('position', e.target.value)} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6 form-group">
                                    <label>Email</label>
                                    <input readOnly type="text" className="form-control" placeholder="Email" value={s.email} onChange={e => this.setInput('email', e.target.value)} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Report To</label>
                                    <input type="text" className="form-control" value={s.reports_to} onChange={e => this.setInput('reports_to', e.target.value)} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={s.password} onChange={e => this.setInput('password', e.target.value)} />
                                </div>
                                {/* <div className="col-md-6">
                                    <label>Repeat Password</label>
                                    <input type="password" className="form-control" value={s.repeat_password} onChange={e => this.setInput('repeat_password', e.target.value)} />
                                </div> */}
                            </div>
                            <div className="mt-5 text-right">
                                <button className="btn btn-primary profile-button" type="button" onClick={() => this.updateProfile()}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        {/* return (
            
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name} referrerPolicy="no-referrer"/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                    </div>
                </div>    
            </div>
        ); */}

    }
}

export default Profile