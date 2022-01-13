import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

export default function LinkForm(props) {

  const initialStateValues = {
    url: '',
    name: '',
    description: ''
  };
  const [values,setValues] = useState(initialStateValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({...initialStateValues})
  }

  const handleInputChange = (e)=>{
    const { name, value } = e.target;
    setValues({...values, [name]: value })
  }

  const getLinkById = async (id) => {
    const doc = await db.collection('links').doc(id).get();
    setValues(doc.data())
  }

  useEffect( () => {
    
    if(props.currentId === ""){
      setValues({...initialStateValues})
    }else{
      getLinkById(props.currentId)
    }
  },[props.currentId])

  return (
    <div>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <div className="input-group-text">
            <i className="material-icons">insert_link</i>
          </div>
          <input 
            type="text" 
            name="url" 
            className="form-control" 
            placeholder='Tu sitio' 
            required
            onChange={handleInputChange}
            value={values.url} />
        </div>
        <div className="form-group input-group">
          <div className="input-group-text">
            <i className="material-icons">create</i>
          </div>
          <input 
            type="text" 
            name="name" 
            className="form-control" 
            placeholder='Nombre de sitio' 
            required
            onChange={handleInputChange} 
            value={values.name} />
        </div>
        <div className="form-group">
          <textarea 
            name="description" 
            rows="3" 
            className="form-control" 
            placeholder="escribe una descripcion" 
            onChange={handleInputChange}
            value={values.description} ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          { (props.currentId==='' ? 'Guardar' : 'Actualizar') }
        </button>
      </form>
    </div>
  )
}
