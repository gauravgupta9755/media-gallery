import React from "react";

const News = (props) => {
 
  return (<>

    <div className="news_contenar may-we-suggest w-auto shadow   mb-1 bg-body rounded " > <a href={props.data.url} className="pic" title={props.data.title}> <img className=" lazyloaded" alt="Modi address highlights" title="Modi address highlights"  src={props.data.urlToImage} width="88" height="50"></img> </a><p title= {props.data.description} className="title may-be-suggest-1867818"> <a className="text_link" href={props.data.url} title={props.data.title}>{props.data.title}</a></p></div>
  </>
  )

}

export default News