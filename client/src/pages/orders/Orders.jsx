import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Orders.scss';

const Orders = () => {
  const currentUser={
      id:1,
      username:'Amar',
      isSeller:true
    };
  return (
    <div className='orders'>
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
          
        </div>
        <table>
          
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser?.isSeller?"Buyer":"Seller"}</th>
              <th>Contact</th>
            </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/762686/pexels-photo-762686.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service1</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/message.png" alt="" /></td>
          </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/762686/pexels-photo-762686.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service2</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/message.png" alt="" /></td>
          </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/762686/pexels-photo-762686.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service3</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/message.png" alt="" /></td>
          </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/762686/pexels-photo-762686.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service4</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/message.png" alt="" /></td>
          </tr>
         
        </table>
      </div>
    </div>
  );
};

export default Orders;
