import React, { useEffect, useState } from "react";
import './popup.css'
import response from '../../data.json'
const Popup = props => {
    const allRocketsList = response?.data
    const [selectedRocketDetails, setSelectedRocketDetails] = useState([]);
    useEffect(() => {
        allRocketsList.forEach((rocket_details) => {
            if(rocket_details.id === props.selectedRocketId) {
                setSelectedRocketDetails(rocket_details)
            }
        })
      },[allRocketsList, props.selectedRocketId])
  return (
    <div className="popup-box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
      <div className="box">
        <div className="leftside">
        <h1>{selectedRocketDetails?.name}</h1>
        <h2>Type: {selectedRocketDetails?.type}</h2>
        <h2>First Flight: {selectedRocketDetails?.first_flight}</h2>
        <div className="rocket_details">
          <div>
            <p><strong>Cost per launch:</strong> {selectedRocketDetails?.cost_per_launch?.toLocaleString()} USD</p>
            <p><strong>Company:</strong> {selectedRocketDetails?.company}</p>
            <p><strong>Success Rate:</strong> {selectedRocketDetails?.success_rate_pct}%</p>
          </div>
          <div>
            <p><strong>Country:</strong> {selectedRocketDetails?.country}</p>
            <p><strong>Stages:</strong> {selectedRocketDetails?.stages}</p>
            <p><strong>Height:</strong> {selectedRocketDetails?.height?.meters}</p>
            <p><strong>Diameter:</strong> {selectedRocketDetails?.diameter?.meters}</p>
            <p><strong>Mass:</strong> {selectedRocketDetails?.mass?.kg?.toLocaleString()}kg</p>
          </div>
        </div>
            {
              selectedRocketDetails?.active ? <p className="active">Active</p> : <p className="inactive">Inactive</p>
            }
        <div className="description">
          {selectedRocketDetails?.description}
        </div>
        <div className="wiki">
          <a className="mb-4 btneffect" href={selectedRocketDetails?.wikipedia} target="_blank" rel="noreferrer">Wikipedia</a>
        </div>
        </div>
        <div className="rightside">
          <div className="image">
            <img src={selectedRocketDetails?.flickr_images?.[0]} alt={selectedRocketDetails?.name} />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Popup;