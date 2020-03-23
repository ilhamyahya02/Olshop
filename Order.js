import React, {Component, Profiler} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            id: "",
            id_user: "",
            id_alamat: "",
            total: "",
            bukti: null,
            status: "",
            detail_order: [],
            id_order: "",
            id_product: "",
            quantity: "",
            user: [],
            fullname: "",
            alamat: "",
            products: [],
            name: "",
        }
        // jika tidak terdapat data token pada lokal storage
        if(!localStorage.getItem("Token")){
            // direct ke halaman login
            window.location = "/";
        }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindBukti = (e) => {
      this.setState({bukti: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data

    get_order = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/shop/public/order";
        axios.get(url)
        .then(response => {
            this.setState({order: response.data.order});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    componentDidMount = () => {
      this.get_order();

    }

    render(){
        const { order } = this.state;
        console.log(order)
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Order</h4>
                            </div>
                        
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Alamat</th>
                                    <th>Total</th>
                                    <th>Pembayaran</th>
                                    <th>Status</th>
                                    <th>Detail Order</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.order.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_order}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.jalan}</td>
                                            <td>{item.total}</td>
                                            <td><img src={'http://localhost/shop/public/images/' + item.bukti}
                                                   alt={item.bukti} width="200px" height="200px"/></td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.detail.map((it) => {
                                                    return(
                                                        <ul key={it.id_order}>
                                                            <li>{it.nama_product} ({it.quantity})</li>
                                                        </ul>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-primary my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Accept
                        </button>
                        <button className="btn btn-danger my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Decline
                        </button>

                        {/* form modal siswa*/}
                    </div>
                </div>


            </div>
        );
    }
}
export default Order;


// return (
    //     <div className="container">
    //     <div className="card mt-2">
    //         <div style={{ paddingTop: "5%", paddingLeft: "7%", paddingRight: "7%" }}>
    //           <div className="#" style={{ maxwidth: "200px" }}>
    //           <h2 className="card-title" style={{ fontWeight: "700" }}>Order</h2>
    //             <div className="row no-gutters">
    //                 <div className="card-body">
                    
                   
    //                 {this.state.order.map((item) => {
    //                     return (
    //                         <ul class="list-group">
    //                         <li class="list-group-item">ID User : {item.id_user}</li>
    //                         <li class="list-group-item">ID Alamat : {item.id_alamat}</li>
    //                         <li class="list-group-item">Bukti : {item.bukti}</li>
    //                         <li class="list-group-item">Total : {item.total}</li>
    //                         <li class="list-group-item">Status : {item.status}</li>
    //                         <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Edit(item)}>
    //                         <span className="fa fa-edit"></span>Edit
    //                         </button>
    //                         </ul>
    //                     );
    //                 })}

            
    //             </div>
            
    //             <Modal id="modal_order" title="Form Order" bg_header="primary" text_header="white">
    //             <form onSubmit={this.Save}>
    //             ID User
    //             <input type="text" className="form-control" name="id_user"
    //             value={this.state.id_user} onChange={this.bind} required />
    //             ID Alamat
    //             <input type="text" className="form-control" name="id_alamat"
    //             value={this.state.id_alamat} onChange={this.bind} required />
    //             Total
    //             <input type="text" className="form-control" name="total"
    //             value={this.state.total} onChange={this.bind} required />
    //             Status
    //             <input type="text" className="form-control" name="status"
    //             value={this.state.status} onChange={this.bind} required />
                
    //             Bukti
    //             <tr>
    //               <input type="file" className="file-control" name="bukti"
    //                 onChange={this.bindBukti} required /> 
    //             </tr>
    //             <button type="submit" className="btn btn-info pull-right m-2">
    //             <span className="fa fa-check"></span> Save
    //             </button>
    //             </form>
    //         </Modal>
    //     </div>
    //     </div>
    //     </div>
    //     </div>
    //     </div>
    // );