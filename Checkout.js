import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
        carts: [],
        num: 0,
        total: 0,
        alamat: [],
        id_pengiriman: "",
        receiver: "",
        pos: "",
        kecamatan: "",
        kota: "",
        jalan: "",
        rt: "",
        rw: "",
        message: "",
        action: "",
        find: "",
        message: ""
    }
}

  getCarts = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let total = 0
    let num = 0
    items.forEach(item => {
        total += item.total
        num += item.stock
    });
    this.setState({
        carts: items,
         num: num,
        total: total
    });
}

get_alamat = () => {
    let id = JSON.parse(localStorage.getItem('id_user'))
    let url = "http://localhost/shop/public/alamat/" + id;
    axios.get(url)
    .then(response => {
        this.setState({
               alamat: response.data.alamat,
        });
    })
    .catch(error => {
        console.log(error);
    });
}

  componentDidMount() {
    this.getCarts()
    this.get_alamat();
  }

  removeFromCart = (product) => {
    let carts = JSON.parse(localStorage.getItem('cart'));
    let cart = carts.filter(item => item.id !== product.id );
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCarts()
  }

    
    render(){
      const { carts, num, total, alamat } =  this.state;
      console.log(alamat)
        return(
            
<div className="container">
        <div className="py-5 text-center">
          
          <h2>Billing Address</h2>
          
        </div>
       
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge badge-pill">{num}</span>
            </h4>

            <table class="table table-stripped">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
            <tbody>
          {carts.map((product, index) =>
              <tr key={index}>
                <td>
                  <h5 className="text-capitalize font-weight-bold">{product.name}</h5>
                  <h6 className="badge"><small>price/product : </small>${product.price}</h6>
                </td>
                <td>
                  <h5><span className="badge">{product.stock}</span></h5>
                </td>
                <td>
                  <h5>
                  <span className="badge">$ {product.total}</span>
                  </h5>
                </td>
                <td>
                <button className="btn btn-sm btn-warning"
                  onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span> Remove</button>
                </td>
              </tr>
            )
          }
          </tbody>
          </table>
          </div>
          {this.state.alamat.map((item) => {
            return(
          <div className="col-md-8 order-md-1">
            
            <div className="container">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label htmlFor="country">Alamat</label>
                  <select className="custom-select d-block w-100" id="country" required>
                    <option value>Choose...</option>
                    <option>{item.jalan}</option>
                  </select>
                  <br/>
                  <button className="btn btn-primary btn-md" type="submit">Continue to checkout</button>
                </div>
              </div>
              </div>
            
          </div>
          );
        })}
          
        </div>
        
        
      </div>
    );
  }

        
    }

export default Checkout
