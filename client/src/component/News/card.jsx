import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../css/card.css';
import '../css/mainhome_card.css';



const Card = (props) => {

  return (<>
    <div className="card_contenar h-auto rounded-3 shadow  mb-2 bg-body m-auto w-100 ">
    <div className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={props.data.urlToImage} className="img-fluid rounded-start" alt="..."></img>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{props.data.title}</h5>
        <p className="card-text">{props.data.discription}</p>
        <button className="btn btn-primary"><a href={props.data.url} target="_blank" className=" text-body text-decoration-none">Visit</a></button>
        <p className="card-text"><small className="text-muted">Author-{props.data.author}</small></p>
      </div>
    </div>
  </div>
</div>
    </div>
  </>);

}

export default Card;