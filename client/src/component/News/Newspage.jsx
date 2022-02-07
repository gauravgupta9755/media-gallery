import React, { useState, useEffect } from "react";
import Card from "./card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../css/mainhome_card.css';

const NewsPage = () => {

    const keys = [
        "ae34faf4d58749c7b3b50b0511956ace",
        "963bc3776f0f4f7e9bc197414da65279",
        "e5d0656cfeeb4487b98a3f90922bf046"
    ]
    const [news, setNews] = useState({ articles: [] });
    const [country, setCountry] = useState("in");
    const [type, setType] = useState("science");
    const [key, setKey] = useState(keys[0]);
    const [disset, seDisSet] = useState("none");
    const [disset2, setDisSet2] = useState("inline")
    //    news api --------------------------------
    //    news api --------------------------------




    const getnews = async (country, type) => {

        for (let i = 0; i < keys.length; i++) {
            const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${type}&apiKey=${keys[i]}`)
            const val = await res.json();
            if (val.status !== "error") {
                setKey(keys[i]);
                break;
            }
        }

        const res2 = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${type}&apiKey=${key}`,{
            
        })
        const val2 = await res2.json();
        if (val2.status === "error") {
            console.log("news error");
            setNews({ articles: [] })

        }
        else {
            setDisSet2("none");
            seDisSet("inline");
            setNews(val2);
            console.log(val2);
        }


    }


    useEffect(() => {

        getnews(country, type);

    }, []);






    const featchtype = (e) => {
        setDisSet2("inline");
        seDisSet("none");
        setType(e.target.value);
        getnews(country, type);
    }
    const featchcountry = (e) => {
        setDisSet2("inline");
        seDisSet("none");
        setCountry(e.target.value);
        getnews(country, type);
    }



    return (<>

        <div className="home_contenar d-flex  w-100 m-auto h-100 overflow-hidden    align-items-center justify-content-center" >

            <div className="  mt-5 m-auto w-50  contenar"style={{height:"30vw"}} >

                <div className="d-flex position-relative bg-body shadow-lg rounded-3 w-100 " >
                    <h2 className=" w-auto mt-2 bg-primary align-items-center justify-content-center shadow-lg rounded-3  p-1  w-auto d-flex " style={{width:"10%",fontSize:"85%" }} >Type


                    </h2>
                    <select className="form-select  m-2 w-50  " onChange={featchtype} aria-label="Default select example" style={{fontSize:"80%"}} >

                        <option value="science" >science</option>
                        <option value="business" >business</option>
                        <option value="entertainment">entertainment</option>
                        <option value="technology">technology</option>
                        <option value="sports">sports</option>
                        <option value="health">health</option>
                        <option value="general">general</option>
                    </select>
                    <h2 className=" w-auto mt-2 align-items-center justify-content-center bg-primary shadow-lg rounded-3  p-1  w-auto d-flex " style={{ width:"10%",fontSize:"85%"}} >Country


                    </h2>
                    <select className="form-select m-2 w-50" onChange={featchcountry} aria-label="Default select example" style={{fontSize:"80%"}} >

                        <option value="in" >india</option>
                        <option value="us" >america</option>
                        <option value="uk" >uk</option>
                        <option value="jp" >japan</option>
                        <option value="ca" >china</option>
                        <option value="ru" >rusia</option>
                    </select>


                </div>
                <div className="loading" style={{ display: disset2 }}>Loadding...</div>
                <div className="contenar hidescrollbar cant position-absolute  shadow-lg rounded-3 pt-5 overflow-scroll " style={{ display: disset,height:"100%",width:"50%" }}>
                    {

                        news.status !== "error" ?
                            news.articles.map((val) => {

                                return <Card data={val}></Card>

                            }) : null
                    }


                </div>
            </div>



        </div>





    </>)
}

export default NewsPage;