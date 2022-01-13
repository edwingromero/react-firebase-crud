import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import { db } from '../firebase'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function Links() {

  const [links, setLinks] = useState([]);

  const [currentId, setCurrentId] = useState('');

  const addOrEditLink = async (linkObject) => {
    if(currentId===''){
      await db.collection('links').doc().set(linkObject);
      toast('nuevo link agregado',{
        type:'success'
      })
    }else{
      await db.collection('links').doc(currentId).update(linkObject);
      toast('link actualizado',{
        type:'success'
      })
      setCurrentId('')
    }
  }

  const onDeleteLink = async (id) => {
    const confirm = window.confirm('estas seguro?')
    if(confirm){
      await db.collection('links').doc(id).delete();
      toast('Link eliminado',{
        type:'error'
      })
    }
  }

  const getLinks = async () => {
    db.collection('links').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach( doc => {
        docs.push({...doc.data(),id:doc.id});
      })
      setLinks(docs);
    });
    
  }
  useEffect( () => {
    getLinks()
  },[])

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{addOrEditLink,currentId, links}}/>
      </div>
      <div className="col-md-8 p-2">
        { links.map( (link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i role="button" className="material-icons text-danger" onClick={() => {
                    onDeleteLink(link.id)
                  }} >close</i>

                  <i role="button" className="material-icons text-warning" onClick={ () => setCurrentId(link.id)} >create</i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" >Ir al sitio web</a>
            </div>
          </div>
        ) )}
      </div>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  )
}
