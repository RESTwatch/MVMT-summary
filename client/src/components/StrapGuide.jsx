import React from 'react';
import Modal from "react-responsive-modal";

class StrapGuide extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
  }

  onOpenModal () {
    this.setState({ open: true });
  };

  onCloseModal () {
    this.setState({ open: false });
  };

  render() {
    return (
      <span id="summary-strap-guide">
        <img id="summary-question-mark" src="https://s3.amazonaws.com/watch-straps/question-mark.png"/>
        <span onClick={this.onOpenModal.bind(this)}>STRAP GUIDE</span>
        <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} center>
          <h2>INTERCHANGEABLE STRAPS GUIDE</h2>
          <p>
            Modern Sport watches feature a quick-release clasp that allows you to easily swap out your strap at home…no tools required.
          </p>
          <div>
            <span>
              
            </span>
            <span>

            </span>
          </div>
        </Modal>
      </span>
    )
  }
}

export default StrapGuide;