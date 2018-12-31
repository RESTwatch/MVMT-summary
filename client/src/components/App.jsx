import React from 'react';
import StrapLoader from './StrapLoader.jsx';
import styles from '../../public/styles.css';

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
        this.setState({
          wid: wid,
          watchSpec: myJson[0][0],
          strapSpec: myJson[1]
        })
      })
  }
  
  render() {
    const watchSpec = this.state.watchSpec;
    if (watchSpec !== null) {
      const hasStraps = Boolean(this.state.strapSpec.length);
      return (
        <div>
          <div className="summary-series">{(watchSpec.series).toUpperCase()} SERIES - {watchSpec.size} MM</div>
          <div className="summary-watch-name">{(watchSpec.watch_name).toUpperCase()}</div>
          <div className="summary-price">${watchSpec.watch_price}</div>
          <div className="summary-size">Size [MM]</div>
          <div className="summary-size-mm">{watchSpec.size}</div>
          <StrapLoader hasStraps={hasStraps} strapSpec={this.state.strapSpec}/>
          <div className="summary-cart">ADD TO CART</div>
        </div>
      )
    } else {
      return <div>Serving up some content...</div>
    }
    
  }
}

export default App;