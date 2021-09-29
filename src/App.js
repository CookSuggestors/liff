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
      liff.init({liffId: process.env.MY_LIFF_ID}) // LIFF IDをセットする
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login({}) // ログインしていなければ最初にログインする
          } else if (liff.isInClient()) { // LIFFので動いているのであれば
            liff.sendMessages([{ // メッセージを送信する
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

  /* 追加: UserProfileをAlertで表示 */
  const getUserInfo = () => {
    liff.ready.then(() => {
      liff.init({liffId: process.env.MY_LIFF_ID})
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login({}) // ログインしていなければ最初にログインする
          } else if (liff.isInClient()) {
            liff.getProfile()  // ユーザ情報を取得する
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>イマレピ</h1>
        <input
          value={msg}
          onChange={handleMsgChange}
        />
        <p>入力した情報:{msg}</p>
        <button onClick={sendMessage}>メッセージを送信</button>
        <button onClick={getUserInfo}>ユーザー情報</button>
      </header>
    </div>
  );
}

export default App;
