import React, {useState} from 'react';
import './App.css';
import {Button} from 'antd';
// import {NavItem} from 'react-router-dom';
import { Jumbotron, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrash} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

function ScreenProfil(props) {

        const [likeCook, setLikeCook] = useState(false)
        const [nameRecette, setNameRecette] = useState('')
        const [typeRecette, setTypeRecette] = useState('')
        const [recette, setRecette] = useState('')
        const [recetteList, setRecetteList] = useState([]) 
        const [error, setError] = useState()
        const [errorRecette, setErrorRecette] = useState()
        // logout() {
        //         // localStorage.clear();
        //         location.href = 'localhost:3000';
        //     }
        

                if(likeCook){
                var colorLike = {color: '#229de5',cursor:'pointer'}
              } else {
                var colorLike = {cursor:'pointer'}
              }

              var handleAjoutRecette = async () => {

                // console.log('nare',nameRecette)
                // console.log('trec',typeRecette)
                // console.log('rec',recette)
                if (nameRecette === undefined || typeRecette === undefined || recette === undefined) {
                        setErrorRecette(<Badge status="error" badgeStyle={{ color: 'white', backgroundColor: '#FF0060' }} value="Le champ est vide"></Badge>)
                        
                      } else {
                        
                         setNameRecette()
                         setTypeRecette()
                         setRecette()
                         setRecetteList([...recetteList, {nameRecette:nameRecette, typeRecette:typeRecette, recette:recette}])
                         console.log('recetteList',recetteList)
                         
                      }

                
                const data = await fetch('/ajoutrecette', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `nameRecette=${nameRecette}&typeRecette=${typeRecette}&recette=${recette}$userId=${props.userId}`
                })
            
                const body = await data.json()
            
                if(body.result === true){
                  console.log('true +++')
                }  
              }

        var newRecette = recetteList.map((recette,i)=> {
                return (
                        <div key={i} className="col-d-4">
                        <div className="box-recette">
                                <p className='h2-like txt-center'>Mettre dans mes favoris <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={() => setLikeCook(!likeCook)}/>
                                </p>
                                <p className='h2-like txt-center'>Nom :</p>
                                <p className='txt-center'>{recette.nameRecette}</p>
                                <p className='h2-like txt-center'>Type :</p>
                                <p className='txt-center'>{recette.typeRecette}</p>
                                <p className='h2-like txt-center'>Recette :</p>
                                <p>{recette.recette}</p>
                                <p className='h2-like txt-center mts'>Supprimer la recette <FontAwesomeIcon 
                                // onClick={() => handledeleteRecette(recette)} 
                                style={{cursor:'pointer'}} icon={faTrash} />
                                </p>
                                
                        </div>
                        </div> )

        })

        // var handledeleteRecette = async (recette) => {
        //         // props.deleteToWishList(recette)
            
        //         const deleteReq = await fetch('/deleterecette', {
        //           method: 'POST',
        //           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //           body: `recette=${recette}&idUserFromFront=${props.hostId}`
        //         })
        //         var response = await deleteReq.json();
        //         setError()

        //         console.log(response);
        //       }

      


              

  return (
    <div className="Login-page" >
            
                <header className="grid-no-wrap nav-header pbs pts">
                        <div className="col-d-6 col-m-12 col-t-12 mls">
                        {/* <span className="navbar-brand"> */}
                                <p className='h1-like'>Grimcook</p> 
                        </div>
                        <div className="col-d-6 col-m-12 col-t-12">
                                <div className="d-flex flex-row justify-content-center ul-clean">
                                        <NavItem>
                                                <NavLink href='/screenprofil' className='nav-menu current'>Accueil</NavLink>
                                        </NavItem>
                                        <NavItem>
                                                <NavLink className='nav-menu'>Mes favoris</NavLink>
                                        </NavItem>
                                        <NavItem>
                                                <NavLink href='/' className='nav-menu'>Déconnexion</NavLink>
                                        </NavItem>
                                </div>
                        </div>
                </header>
            


        <Jumbotron className="banner-espace">
                <h1 className="display-3 txt-center">Mes recettes</h1>
                <p className="lead txt-center">Votre espace personnel pour retrouver toutes vos recettes</p>
               
                
      </Jumbotron>

      
          {/* SIGN-IN */}

         <main className="wrap">
                <div className='grid justify-content-left'>

                        <div className='col-d-4'>
                                <div className='box-1'>
                                        <h2>Ajoutez une nouvelle recette</h2>
                                        <Form className='justify-content-center mts'>
                                                <FormGroup className='mbm'>
                                                        <Label for="nom" className='txt-blue'>Nom de la recette</Label>
                                                        <Input 
                                                        onChange={(e) => setNameRecette(e.target.value)} 
                                                        className='recette-input' 
                                                        type="text" 
                                                        name="nom" 
                                                        id="nom" 
                                                        placeholder="Moelleux au chocolat"
                                                        value={nameRecette} />
                                                </FormGroup> 
                                                <FormGroup className='mbm'>
                                                        <Label for="type" className='txt-blue'>Type</Label>
                                                        <Input 
                                                        onChange={(e) => setTypeRecette(e.target.value)} 
                                                        className='recette-input' 
                                                        type="text" 
                                                        name="type" 
                                                        id="type" 
                                                        placeholder="Dessert"
                                                        value={typeRecette} />
                                                </FormGroup> 
                                                <FormGroup className='mbm'>
                                                        <Label for="recette" className='txt-blue'>Recette</Label>
                                                        <Input 
                                                        onChange={(e) => setRecette(e.target.value)} 
                                                        type="textarea" 
                                                        name="recette" 
                                                        id="recette"
                                                        value={recette} />
                                                </FormGroup>
                                                {errorRecette}
                                                <Button className='button-secondary' type="primary" 
                                                onClick={()=> handleAjoutRecette()} >Enregistrer ma recette</Button>
                                        </Form>
                                        
                                </div>
                        </div>
                                {newRecette}
                        {/* <div className="col-d-4">
                                <div className="box-recette">
                                         <p className='h2-like txt-center'>Mettre dans mes favoris <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={() => setLikeCook(!likeCook)}/>
                                         </p>
                                        <p className='h2-like txt-center'>Nom :</p>
                                        <p className='txt-center'>Les Jaffa Cakes</p>
                                        <p className='h2-like txt-center'>Type :</p>
                                        <p className='txt-center'>Dessert</p>
                                        <p className='h2-like txt-center'>Recette :</p>
                                        <p>Pour 36 Jaffa cakes.Des moules à mini-muffins ou à tartelettes de 5cm de diamètre.La génoise : 50g de beurre, 205g de farine, 330g d’oeufs, 200g de sucre. Préchauffer le four à 180°. Dans la cuve du batteur fouetter les oeufs et le sucre jusqu’à ce que le mélange triple de volume et fasse le ruban. Fondre le beurre. Prélever une petite partie de l’appareil oeufs/sucre et le mélanger avec le beurre fondu. Tamiser la farine au-dessus de l’appareil restant dans la cuve et l’incorporer délicatement à la maryse. Ajouter en dernier le mélange avec le beurre fondu. Beurrer si nécessaire les moules puis les remplir aux 3/4 avec l’appareil à génoise. Cuire environ 10min. La génoise doit rester moelleuse. La gelée d’orange : 1915g de jus d’orange fraîchement pressé, 480g de suprêmes d’orange, 125g de sucre, 260g d’eau et 52g de gélatine en poudre. Réhydrater la gélatine dans l’eau froide, bien la dissoudre et réserver au réfrigérateur pendant la suite de la préparation. Chauffer le jus d’orange et le sucre. Couper les suprêmes d’oranges en petits dés. Ajouter la gélatine réhydratée et les petits dés d’orange dans le jus chauffé avec le sucre. Débarrasser sur une ou plusieurs plaques à rebord sur une épaisseur de 6mm et bloquer au froid. Une fois la gelée prise la détailler en disques de la taille de la génoise.</p>
                                        <p className='h2-like txt-center mts'>Supprimer la recette <FontAwesomeIcon style={{cursor:'pointer'}} icon={faTrash} />
                                         </p>
                                        
                                </div>
                        </div> */}
                 </div>
                
        </main>
      </div>
      
  );
}

function mapStateToProps(state) {
        return {
                token: state.token, userId: state.userId,
          
        }
      }

      export default connect(
        mapStateToProps,
        null
      )(ScreenProfil)

