import React from 'react';
import liff from '@line/liff';
import './App.css';
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {

  const [val, setVal] = React.useState([]);
  // const [ingredients,setIngredients] = React.useState(['野菜','フルーツ','トマト','じゃがいも','さつまいも']);
  const [ingredients,setIngredients] = React.useState([]);
  const [add,setAdd] = React.useState('');
  const [image, setImage] = React.useState();
  const [imageUrl, setImageUrl] = React.useState('');
  const sendText = val.join(', ');

  const getImage = (e) => {
    if(!e.target.files) return
    const img = e.target.files[0]
    setImage(img);
    setImageUrl(URL.createObjectURL(img));
  }

const submitImage = () => {
  const header = { headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }}
  const data = new FormData()
  data.append('file', image)
  //aws rekognitionのURLをセット
  const imgUri = '任意のURL'
  axios.post(imgUri, data, header)
  .then(res => {
    console.log(res.data.token);
    //食材リストに画像解析結果のリストをセット
    setIngredients(res.data.token);
  }).catch(err => {
    console.error(err.response.data.error);
  })
}
  
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
            window.alert('食材を登録しました!');
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

  // function processImage(event){
  //   const imageFile = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(imageFile);
  //   setFileUrl(imageUrl)
  // }

  
  

  return (
    <div className="App">
      <div className="title">
        <h1>イメレピ</h1>
      </div>

      <div>
        <form>
          　<label htmlFor="img"></label>
          　<input id="img" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={e => getImage(e)} />
          　<input type="button" value="画像を送信" onClick={submitImage} />
        </form>
      </div>
      <br/>
      <img src={imageUrl} height="100" width="auto"/>
      {/* <input type="file" accept="image/*" onChange={processImage}/>
      <img src={fileUrl} height={200} width={300}/>
      {fileUrl} */}
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

      <div className='addIngredient'>
        <input
          value={add}
          onChange={handleInputChange}
        />
        <button onClick={addIngredient}>追加</button>
      </div>

      <p>選んだ食材:{sendText}</p>
      <div className='form'>
        <Button variant="contained" onClick={() => sendMessage(sendText)}>送信</Button>
      </div>
    </div>
  );
}

export default App;