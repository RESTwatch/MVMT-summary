import React from 'react';
import Strap from './Strap.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      wid: null,
      watchSpec: null,
      strapSpec: null
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
          watchSpec: myJson[0][0],
          strapSpec: myJson[1]
        })
      })
  }
  
  render() {
    const watchSpec = this.state.watchSpec;
    console.log('watch: ', watchSpec);
    if (watchSpec !== null) {
      return (
        // <div>Hi</div>
        <div>
          <div>{(watchSpec.series).toUpperCase()} SERIES - {watchSpec.size} MM</div>
          <div>{(watchSpec.watch_name).toUpperCase()}</div>
          <div>${watchSpec.watch_price}</div>
          <div>Size [MM]</div>
          <div>{watchSpec.size}</div>
          <div>ADD A SECOND STRAP</div>
          <div>{this.state.strapSpec.map(strap => {
            return <Strap strap={strap} key={strap.strap_id}/>
          })}</div>
        </div>
      )
    } else {
      return <div>Serving up some content...</div>
    }
    
  }
}

export default App;