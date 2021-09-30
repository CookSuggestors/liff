import React from 'react';
import liff from '@line/liff';
import './App.css';

function App() {
  const [msg,setMsg] = React.useState('');

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  }

  const sendMessage = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient()) {
          liff.sendMessages([{
            'type': 'text',
            'text': msg
          }]).then(function() {
            window.alert('Message sent');
            setMsg('');
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
    // const ingredients = ['野菜','フルーツ','じゃがいも'];
  }
  
  return (
    <div className="App">
      <h1>イメレピ</h1>
      <h1>入力データ:{msg}</h1>
      <input
        value={msg}
        onChange={handleMsgChange}
      />
      <button className="button" onClick={sendMessage}>send message</button>
      <button className="button" onClick={getUserInfo}>show user info</button>
    </div>
  );
}

export default App;