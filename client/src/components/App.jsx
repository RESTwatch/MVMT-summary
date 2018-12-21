import React from 'react';
import Strap from './Strap.jsx';

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
    const spec = this.state.data;
    if (spec !== null) {
      const watch = spec[0];
      return (
        <div>
          <div>{(watch.series).toUpperCase()} SERIES - {watch.size} MM</div>
          <div>{(watch.watch_name).toUpperCase()}</div>
          <div>${watch.watch_price}</div>
          <div>Size [MM]</div>
          <div>{watch.size}</div>
          <div>ADD A SECOND STRAP</div>
          <div>{spec.map(strap => {
            return <Strap strap={strap}/>
          })}</div>
        </div>
      )
    } else {
      return <div>Serving up some content...</div>
    }
    
  }
}

export default App;