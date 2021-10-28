import React from "react";
import './Card.css';


class Card extends React.Component{

    render(){
        // const profile = testData[0]; //it will only get the first data
        const profile = this.props;     //this keyword in here refers to the instance of the card component
        return(
            <div className="github-profile">

                <div className="img">
                    <img src={profile.avatar_url} height="50px" width="50px" alt=""></img>
                </div>
                
                <div className="info" >
                    <div className="name" > {profile.name} </div>
                    <div className="company"> {profile.company} </div>
                </div>
            </div>
        );
    }
}

// style={{margin : '1rem'}}
// style={{display: 'inline-block', margin: 10}}
// 
export default Card;