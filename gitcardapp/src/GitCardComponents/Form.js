import React from "react";
import styles from './App.module.css';
import axios from 'axios';

class Form extends React.Component {

    // userNameInput = React.createRef();

    state = {
        userName : '',
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        // for fetching the json of user
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        //here we are trying to access the onSubmit property to call the parent function sent as props here
        //resp.data is the data of json we need
        this.props.onSubmit(resp.data);

        //to reset the input field after the card has been added we use setState to ''
        this.setState({userName : ''});
    }

	render() {
  	return (
          <div className={styles.form}>
              <form onSubmit={this.handleSubmit}>
                  <div className={styles.input}>
                    <input 
                        type="text" 

                        //here the value is now being controlled by the react element
                        value={this.state.userName}  
                        //we capture the event and change the value of the state by grabbing the event value being typed that time
                        onChange={e => this.setState({ userName : e.target.value})}

                        placeholder="GitHub username" 
                        // ref={this.userNameInput}
                        required
                    />
                  </div>
                  <div className={styles.button}>
                    <button>Add card</button>
                  </div>
    	      </form>
          </div>
    	
    );
  }
}

export default Form;