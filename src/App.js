import React from 'react';
import liff from '@line/liff';
import './App.css';
import Button from '@mui/material/Button';

function App() {

  const [val, setVal] = React.useState([]);
  const [ingredients,setIngredients] = React.useState(['野菜','フルーツ','トマト','じゃがいも','さつまいも']);
  const [add,setAdd] = React.useState('');
  const sendText='['+val.join(', ')+']';
  
  const sendMessage = (text) => {  
    liff.init({liffId: process.env.REACT_APP_LIFF_ID})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient()) {
          liff.sendMessages([{
            'type': 'text',
            'text': text
          }]).then(function() {
            window.alert('Message sent');
          }).catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
        }
      })
  }

  const handleInputChange = e => {
    setAdd(e.target.value);
  }
  
  const addIngredient = () => {
    setIngredients([...ingredients,add]);
    setVal([...val,add]);
    setAdd('');
  }
  const handleChange = e => {
    if (val.includes(e.target.value)) {
      setVal(val.filter(ingredient => ingredient !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };

  
  

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
      <input
        value={add}
        onChange={handleInputChange}
      />
      <button onClick={addIngredient}>追加</button>
      <p>選んだ食材:{sendText}</p>
      <div className='form'>
        <Button variant="contained" onClick={() => sendMessage(sendText)}>送信</Button>
      </div>
    </div>
  );
}

export default App;