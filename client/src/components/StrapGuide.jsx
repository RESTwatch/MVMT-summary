import React from 'react';
import Modal from "react-responsive-modal";

class StrapGuide extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
  }

  toggleModal () {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <span id="summary-strap-guide">
        <img id="summary-question-mark" src="https://s3.amazonaws.com/watch-straps/question-mark.png"/>
        <span onClick={this.toggleModal.bind(this)}>STRAP GUIDE</span>
        <Modal open={this.state.open} onClose={this.toggleModal.bind(this)} center>
          <div className="summary-strap-guide-modal">
          <h2>INTERCHANGEABLE STRAPS GUIDE</h2>
          <p className="summary-strap-guide-info">
            Modern Sport watches feature a quick-release clasp that allows you to easily swap out your strap at home…no tools required.
          </p>
          <div className="summary-strap-guide-images">
            <span>
              <img src="https://s3.amazonaws.com/watch-straps/remove.jpg"/>
              <div className="summary-strap-step-title">REMOVE</div>
              <p className="summary-strap-step-instructions">Using your thumb, slide the lever sideways and remove from holes.</p>
            </span>
            <span>
              <img src="https://s3.amazonaws.com/watch-straps/attach.jpg"/>
              <div className="summary-strap-step-title">ATTACH</div>
              <p className="summary-strap-step-instructions">With the lever held back, place strap into holes and release to secure.</p>
            </span>
          </div>
          </div>
        </Modal>
      </span>
    )
  }
}

export default StrapGuide;