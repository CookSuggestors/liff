import liff from '@line/liff';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import * as Config from '../config';

function App() {


  useEffect(()=>{
      initLiff()// 初期化処理
  }, [])

  /**
   * LIFFの初期化を行う
   * 初期化完了. 以降はLIFF SDKの各種機能を利用できる
   *  =>初期化前でも使用できる機能もある（liff.isInClient()など）
   */
  const initLiff = () => {
      liff.init({ liffId: process.env.REACT_APP_LIFF_ID})
          .then(()=>{ 
              //ログインしていなければログインさせる
              if(liff.isLoggedIn() === false) liff.login({})
          }).catch( (error)=> {});
  }

  /**
   * LINEで保持しているユーザー情報取得
   */
  const getUserInfo = () => {
      liff.getProfile().then(profile => {
          alert( JSON.stringify(profile) );
      }).catch((error)=>{})
  }
  const sendMessege = () => {
    liff.sendMessages([{
      'type':'text',
      'text':'送信テストです',
    }])
  }
  return (
      <div>
          {/* LIFF内以外からアクセス */}
          {liff.isInClient() === false ?
              <p>ブラウザからはお使いいただけません。LINE内アプリ（LIFF）からご利用ください。</p>
          :
              <p>こんにちは</p>
          }
          {getUserInfo}
          <button onClick={sendMessege}>メッセージを送信</button>
      </div>
  );
}

export default App;