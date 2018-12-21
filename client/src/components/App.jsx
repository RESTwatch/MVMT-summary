import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const urlSections = url.split('/');
    const wid = urlSections[urlSections.length - 2];
    fetch(`/api/watches/${wid}/summary`)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(JSON.stringify(myJson));
      })
  }
  
  render() {
    
    // const displayString = `Watch id on current page is: ${wid}`;
    return <h1>'Hello'</h1>;
  }
}

export default App;