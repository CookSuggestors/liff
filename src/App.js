import React from 'react';
import liff from '@line/liff';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  const sendMessage = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient()) {
          liff.sendMessages([{
            'type': 'text',
            'text': val
          }]).then(function() {
            window.alert('Message sent');
          }).catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
        }
      })
  }

  const [val, setVal] = React.useState([]);

  const handleChange = e => {
    if (val.includes(e.target.value)) {
      setVal(val.filter(ingredient => ingredient !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };
  
  const ingredients = ['野菜','フルーツ','トマト','じゃがいも','さつまいも'];

  return (
    <div className="App">
      <div className="title">
        <h1>イメレピ</h1>
      </div>
      
      <div className="checkBox">
        {ingredients.map((ingredient,index) => {
          return (
            <div>
              <label key={index}>
                <input
                  type="checkbox"
                  value={ingredient}
                  onChange={handleChange}
                  checked={val.includes(ingredient)}
                />
                {ingredient}
              </label>
            </div>
          )
        })}
      </div>
      <p>選んだ食材:{val.join(', ')}</p>
      <div className='form'>
        <Button variant="contained" onClick={sendMessage}>送信</Button>
      </div>
      
    </div>
  );
}

export default App;