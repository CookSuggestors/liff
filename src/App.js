import React from 'react';
import liff from '@line/liff'; // 追加
import logo from './logo.svg';
import './App.css';

function App() {
  const sendMessage = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient()) {
          liff.sendMessages([{
            'type': 'text',
            'text': "You've successfully sent a message! Hooray!"
          }]).then(function() {
            window.alert('Message sent');
          }).catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
        }
      })
  }

  const getUserInfo = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient()) {
          liff.getProfile()
            .then(profile => {
              const userId = profile.userId
              const displayName = profile.displayName
              alert(`Name: ${displayName}, userId: ${userId}`)
            }).catch(function(error) {
              window.alert('Error sending message: ' + error);
            });
        }
      })

  }

  return (
    <div className="App">
      <h1>イメレピ</h1>
      <button className="button" onClick={sendMessage}>send message</button>
      <button className="button" onClick={getUserInfo}>show user info</button>
    </div>
  );
}

export default App;