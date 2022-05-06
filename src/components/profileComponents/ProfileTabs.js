import axios from "axios";
import React, { useState } from "react";

const ProfileTabs = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [notif, setNotif] = useState({
    type: '',
    text: '',
  });

  const validatePassword = (oldPass, newPass) => {
    if (oldPass !== newPass) {
      setNotif({
        type: 'danger',
        text: 'Password doesnt match',
      })
    }
  }

  const updateUser = async (e) => {
    e.preventDefault();
    if (!validatePassword(password, confirmPass)) {
      const qs = require('qs');
      const data = new FormData();
      data.append('username', username);
      data.append('email', email);
      data.append('password', password);

      try {
        const response = await axios.patch(`LINK API`, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': JSON.parse(localStorage.getItem('token')),
          }
        })
        if (response.data) setNotif({
          type: 'success',
          text: 'Data berhasil disimpan.',
        })
      } catch (e) {
        if (e.response.data) setNotif({
          type: 'danger',
          text: e.response.data.msg,
        })
      }
    }
  }

  return (
    <>
      {
        notif && (
          <div className={"alert alert-" + notif.type} role="alert">
            {notif.text}
          </div>
        )
      }
      <form onSubmit={updateUser} className="row  form-container">
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input className="form-control" type="text" placeholder={props.userData.fullname} value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input className="form-control" type="email" placeholder={props.userData.email} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input className="form-control" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
