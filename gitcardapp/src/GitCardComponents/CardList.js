import Card from './Card.js';
import React from "react";

const CardList = (props) => (
        
        <div>
            
            {/* <Card {...testData[0]}/>
            <Card {...testData[1]}/>
            <Card {...testData[2]}/> */}

            {/* The below Code is an iterative code for array
             and a replacement for the above code
             we can also use any name instead of profile variable to iterate and catch the value */}
            {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}

        </div>
)


export default CardList;