import React from 'react';
import StrapLoader from './StrapLoader.jsx';
import styles from '../../public/styles.css';
import SelectedStrapNames from './SelectedStrapNames.jsx';

class Summary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      wid: null,
      watchSpec: null,
      strapSpec: null,
      totalPrice: null,
      selectedStraps: {}
    };
  };

  componentDidMount() {
    const url = window.location.href;
    const urlSections = url.split('/');
    const wid = urlSections[urlSections.length - 2];
    fetch(`/api/watches/${wid}/summary`)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log('myJSON ROWS:   ', myJson.rows);
        let rows = myJson.rows;
        let watch = rows[0];
        let watchSpec = {
          id: watch.id,
          wid: watch.wid,
          watch_name: watch.watch_name,
          series: watch.series,
          size: watch.size,
          watch_price: watch.watch_price
        }
        let straps = [];
        rows.forEach(row => {
          let strap = {
            id: row.id,
            strap_id: row.strap_id,
            strap_name: row.strap_name,
            strap_image: row.strap_image,
            strap_price: row.strap_price
          };
          straps.push(strap);
        });
        this.setState({
          wid: wid,
          watchSpec: watchSpec,
          strapSpec: straps,
          totalPrice: watch.watch_price
        })
        if (this.state.strapSpec.length) {
          this.state.strapSpec.forEach((strapObj, i) => {
            strapObj.isSelected = false;
            strapObj.index = i;
          })
        }
      })
  }

  strapClickHandler(index, strapPrice, strapName) {
    if (this.state.strapSpec[index].isSelected) {
      delete this.state.selectedStraps[strapName];
      this.setState({
        totalPrice: this.state.totalPrice - strapPrice
      })
    } else {
      this.state.selectedStraps[strapName] = strapName;
      this.setState({
        totalPrice: this.state.totalPrice + strapPrice
      })
    }
    this.state.strapSpec[index].isSelected = !this.state.strapSpec[index].isSelected;
    this.forceUpdate();
  }
  
  render() {
    const watchSpec = this.state.watchSpec;
    if (watchSpec !== null) {
      const hasStraps = Boolean(this.state.strapSpec.length);
      return (
        <div className="summary-body">
          <div className="summary-series">{(watchSpec.series).toUpperCase()} SERIES - {watchSpec.size} MM</div>
          <div className="summary-watch-name">{(watchSpec.watch_name).toUpperCase()}</div>
          <SelectedStrapNames names={Object.keys(this.state.selectedStraps)}/>
          <div className="summary-price">${this.state.totalPrice}</div>
          <div className="summary-size">Size [MM]</div>
          <div className="summary-size-mm">{watchSpec.size}</div>
          <StrapLoader clickHandler={this.strapClickHandler.bind(this)} hasStraps={hasStraps} strapSpec={this.state.strapSpec}/>
          <div className="summary-cart">ADD TO CART</div>
        </div>
      )
    } else {
      return <div className="summary-body">Serving up some content...</div>
    }
    
  }
}

export default Summary;