import React from 'react';
import './App.css';
import liff from '@line/liff';

function App() {
  const [msg,setMsg] = React.useState('');

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  }

  const sendMessage = () => {
    liff.ready.then(() => {
      liff.init({liffId: process.env.REACT_APP_LIFF_ID})
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login({})
          } else if (liff.isInClient()) {
            liff.sendMessages([{
              'type': 'text',
              'text': {msg},
            }]).then(function() {
              window.alert('Message sent');
            }).catch(function(error) {
              window.alert('Error sending message: ' + error);
            });
          }
        })
      })
  }

  const getUserInfo = () => {
    liff.ready.then(() => {
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
    })
  }

  const envValue=process.env.REACT_APP_LIFF_ID;

  return (
    <div className="App">
      <header className="App-header">
        <h1>イマレピ</h1>
        <input
          value={msg}
          onChange={handleMsgChange}
        />
        <p>入力した情報:{msg}</p>
        <p>環境変数:{envValue}</p>
        <button onClick={sendMessage}>メッセージを送信</button>
        <button onClick={getUserInfo}>ユーザー情報</button>
      </header>
    </div>
  );
}

export default App;
