
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import "./Product.css";

const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await fetch('http://localhost:5000/products', {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const data = await result.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      const data = await result.json();
      if (data) {
        getProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    return formattedTime;
  };

  return (
    <div className='product-list'>
      

      {/* {products.length > 0 ?
        products.map((item, index) => (
          <ul key={item._id}>
            <li>
            <p>
              <img src={item.image} alt="" srcset="" />
            </p>
              <p className="name">Topic: {item.name}</p>
              <p>Content: {item.content}</p>
              <p>Time: {formatTimestamp(item.timestampField)}</p>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/"+item._id}>Update</Link>
            </li>
          </ul>
        ))
        : <h1>No Result</h1>
      } */}
      {
        products.length>0 ?
        products.map((item,index)=>(
          <Card sx={{ maxWidth: 400 }} className='card'>
      <CardMedia
        sx={{ height: 230 }}
        image={item.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {formatTimestamp(item.timestampField)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteProduct(item._id)} color='error' className='btn'>Delete</Button>
        <Button size="small" color='error' className='btn'><Link to={"/update/"+item._id}>Update</Link></Button>
      </CardActions>
    </Card>
        )):
        <h1>No Result Found</h1>
      }
      
    </div>
  );
};

export default Productlist;
