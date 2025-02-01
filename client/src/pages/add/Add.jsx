import React from 'react'
import "./Add.scss"

const test=()=>{
    
}
const Add = () => {
  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Services</h1>
        <div className="sections">
          <div className="left">
              <label htmlFor="">Title</label>
              <input type="text" placeholder="e.g. I will create a modern, responsive website tailored to your business needs " />
              <label htmlFor="">Category</label>  
              <select name="cats" id="cats">
                <option value="design">Design</option>
                <option value="web">Web development</option>
                <option value="animation<">Animation</option>
                <option value="music">Music</option>
                </select>   
                <label htmlFor="">Cover Image</label>
                <input type="file" />
                <label htmlFor="">Upload Image</label>
                <input type="file" />
                <label htmlFor="">Description</label>
                <textarea name="" 
                id=""
                cols="30" 
                rows="16" 
                placeholder='introduce your service to customers'></textarea>
                <button>Create</button>
              </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" placeholder='e.g. one-page web design' />
            <label htmlFor="">Short Description</label>
            <textarea name="" 
                id=""
                cols="30" 
                rows="10" 
                placeholder='short description of your service'></textarea> 
            <label htmlFor="">Delivery Time(e.g.3 days)</label>
            <input type="number" min={1}/>
            <label htmlFor="">Revision Number</label>
            <input type="number" min={1}/>
            <label htmlFor="">Add Features</label>
            <input type="text" placeholder='e.g. page design'/>
            <input type="text" placeholder='e.g. file uploading'/>
            <input type="text" placeholder='e.g. setting up a domain'/>
            <input type="text" placeholder='e.g. hosting'/>
            <label htmlFor="">Price</label>
            <input type="number" min={1}/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Add