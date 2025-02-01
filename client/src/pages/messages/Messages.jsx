import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Messages.scss';

const  Messages= () => {
  const currentUser={
      id:1,
      username:'Amar',
      isSeller:true
    };
    const message=`bro..! i need some work..!`
  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
          
        </div>
        <table>
          
            <tr>
              <th>Buyer</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
      
          <tr className="active">
            <td>
              Prakash
            </td>
                   {/* substring(0,10) */}          
            <td><Link to="/message/123" className='link'>{message}</Link></td> 
            <td>1 day ago</td>
            <td><button>Mark As Read</button></td>
            
          </tr>

          <tr className="active">
            <td>
              Maaran
            </td>
            <td><Link to="/message/123" className='link'>{message}</Link></td>
            <td>2 days ago</td>
            <td><button>Mark As Read</button></td>
          </tr>

          <tr>
            <td>
             Edison
            </td>
            <td><Link to="/message/123" className='link'>{message}</Link></td>
            <td>2 days ago</td> 
          </tr>

          <tr>
            <td>
              Vigensh
            </td>
            <td><Link to="/message/123" className='link'>{message}</Link></td>
            <td>3 days ago</td> 
          </tr>
         
        </table>
      </div>
    </div>
  );
};

export default Messages;
