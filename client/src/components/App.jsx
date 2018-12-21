import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null
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
        console.log(myJson);
        this.setState({
          wid: wid,
          data: myJson
        })
      })
  }
  
  render() {
    const data = this.state.data;
    if (data !== null) {
      return (
        <h1>{data[0].watch_name}</h1>
      )
    } else {
      return <div>Loading...</div>
    }
    
  }
}

export default App;