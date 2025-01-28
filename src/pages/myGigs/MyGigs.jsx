import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './myGigs.scss';

const MyGigs = () => {
  return (
    <div className='myGigs'>
      <div className="container">
        <div className="title">
          <h1>Service</h1>
          <Link to="/add">
          <button>Add New Service</button>
          </Link>
        </div>
        <table>
          
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/1178683/pexels-photo-1178683.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service1</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/delete.png" alt="" /></td>
          </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/1178683/pexels-photo-1178683.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service2</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/delete.png" alt="" /></td>
          </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/1178683/pexels-photo-1178683.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service3</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/delete.png" alt="" /></td>
          </tr>
          <tr>
            <td>
              <img className='img'src="https://images.pexels.com/photos/1178683/pexels-photo-1178683.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </td>
            <td>Service4</td>
            <td>2000/-</td>
            <td>123</td>
            <td><img className="delete" src="./img/delete.png" alt="" /></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
