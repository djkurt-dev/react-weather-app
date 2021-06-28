import React from 'react';

export default function Navbar(props) {

    return (
        <div className="row mt-4">
            <div className="col-md-12 mb-3 text-center">
                <h1 className="title">Weather App</h1>
            </div>
            <div className="col-md-12 text-center">
                <form className="form-group region " >
                    <input type="text" className="form-control regioninput" placeholder="Select your region" />
                    <button onClick={(e) => { props.changeRegion(e.target.value) }} className="btn"><span><i class="fas fa-search fa-2x"></i></span></button>
                </form>
            </div>
        </div>
    );

}