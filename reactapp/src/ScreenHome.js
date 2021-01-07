import React, {useState} from 'react';
import './App.css';
import {Input,Button} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import { Jumbotron } from 'reactstrap';
import {connect} from 'react-redux'

function ScreenHome(props) {

        const [signUpUsername, setSignUpUsername] = useState('')
        const [signUpEmail, setSignUpEmail] = useState('')
        const [signUpPassword, setSignUpPassword] = useState('')

        const [signInEmail, setSignInEmail] = useState('')
        const [signInPassword, setSignInPassword] = useState('')

        const [userExists, setUserExists] = useState(false)

        const [listErrorsSignin, setErrorsSignin] = useState([])
        const [listErrorsSignup, setErrorsSignup] = useState([])

        var handleSubmitSignin = async () => {
 
                const data = await fetch('/sign-in', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
                })
            
                const body = await data.json()
            
                if(body.result == true){
                  props.addToken(body.token)
                  setUserExists(true)
                  
                }  else {
                  setErrorsSignin(body.error)
                }
              }
        
              var handleSubmitSignup = async () => {
    
                const data = await fetch('/sign-up', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
                })
            
                const body = await data.json()
            
                if(body.result == true){
                  props.addToken(body.token)
                  setUserExists(true)
                  
                } else {
                  setErrorsSignup(body.error)
                }
              }

        
        if(userExists){
                return <Redirect to='/screenprofil' />
        }
        
        var tabErrorsSignin = listErrorsSignin.map((error,i) => {
                return(<p>{error}</p>)
        })
        
        var tabErrorsSignup = listErrorsSignup.map((error,i) => {
                return(<p>{error}</p>)
        })

  return (
    <div className="Login-page" >
            <header className="grid-no-wrap nav-header">
                    <div className="col-d-6 col-m-12 col-t-12 mls">
                        <p className='h1-like'>Grimcook</p> 
                    </div>
                    <div className="col-d-6 col-m-12 col-t-12 nav-menu mrs">
                            <ul className="ul-clean no-show">
                                    <li>Logout</li>
                            </ul>
                    </div>
            </header>


        <Jumbotron className="banner-accueil">
                <h1 className="display-3 txt-center">Votre livre de cuisine à porté de main</h1>
                <p className="lead txt-center">Fini les feuilles volantes, centralisez toutes vos recettes en un seul endroit</p>
                
      </Jumbotron>

      
          {/* SIGN-IN */}

         <main className='grid justify-content-center'>
                
                        <div className="Sign">
                                <h2>J'ai déjà un compte</h2>
                                
                                <Input 
                                className="Login-input" placeholder="arthur@lacapsule.com"
                                onChange={(e) => setSignInEmail(e.target.value)} />

                                <Input.Password 
                                className="Login-input" placeholder="password"
                                onChange={(e) => setSignInPassword(e.target.value)}  />

                                {tabErrorsSignin}

                                <Button 
                                onClick={() => handleSubmitSignin()}  
                                className='button'
                                type="primary">Me connecter</Button>

                        </div>

                        {/* SIGN-UP */}

                        <div className="Sign">
                                <h2>Je n'ai pas encore de compte</h2>
                                <Input 
                                onChange={(e) => setSignUpUsername(e.target.value)}
                                className="Login-input" placeholder="Arthur" />

                                <Input 
                                onChange={(e) => setSignUpEmail(e.target.value)}
                                className="Login-input" placeholder="arthur@lacapsule.com" />

                                <Input.Password
                                onChange={(e) => setSignUpPassword(e.target.value)}  
                                className="Login-input" placeholder="password" />

                                {tabErrorsSignup}

                                <Button 
                                onClick={() => handleSubmitSignup()}
                                className='button' type="primary">M'inscrire</Button>
                        </div>
        </main>
      </div>
      
  );
}


function mapDispatchToProps(dispatch){
        return {
          addToken: function(token){
            dispatch({type: 'addToken', token: token})
            
          },
          addId: function (userId) { 
            dispatch( {type: 'addId', userId: userId} )
          }
        }
      }

export default connect(
        null,
        mapDispatchToProps
      )(ScreenHome)
