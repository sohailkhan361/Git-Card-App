import React from 'react';
import styles from './App.module.css';
import CardList from './CardList.js';
import Form from './Form.js';
// import StarMatch from './Stargame';
//data has to be given only to one component, usually parent
//import {testData} from './Data.js'; 

class App extends React.Component{

  //This is the usual method...
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     profiles : testData,
  //   };
  // };

  //This also works well...
  state = {
    // profiles : testData,
    profiles : [],  //empty for fresh fetch from api
  }

  addNewProfile = (profileData) => {

    this.setState(prevState => ({
      profiles : [...prevState.profiles, profileData],  //similar to concat, to append and add data using rest operator
    }));

    //Only for testing purpose......
    // console.log('App profiles', this.profiles);
    // console.log('App profileData', profileData);
    // console.log('App prevState', this.prevState);
  };

  render(){
    return (
      <div>
          <div className={styles.header}>{this.props.title}</div>

          {/* Trying to send the reference of addNewProfile function 
          because child function can not change the data of parent i.e. App, 
          so the parent component will do that itself
          Now the function has been sent as props */}
          <Form onSubmit={this.addNewProfile}/>   
          <CardList profiles={this.state.profiles} />
          
          {/* <StarMatch/> */}
      </div>
    
    );
  }
}

// const App = ({title}) => (
//   <div className="header">{title}</div>
// );

// ReactDOM.render(
// 	<App title="The GitHub Cards App" />,
//   mountNode,
// );

export default App;
