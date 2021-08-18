import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import '../../styles/CardItem.css';

class CardItem extends Component {
  state = {
    item: null,
  };

  componentDidMount() {
    apiHandler
      .getOneItem(this.props.id)
      .then((itemData) => {
        this.setState({
          item: itemData,
        });
        // console.log(itemData);
      })
      .catch((err) => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      apiHandler
        .getOneItem(this.props.id)
        .then((itemData) => {
          this.setState({
            item: itemData,
          });
          // console.log(itemData);
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    if (this.state.item === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="CardItem">
        <div className="item">
          <span onClick={this.props.onClose}>Close</span>
          <div className="round-image">
            <img src={this.state.item.image} alt="" />
          </div>

          <p>{this.state.item.name}</p>
          <p>
            Quantity: {this.state.item.quantity} | {this.state.item.category[0]}
          </p>
          <p>{this.state.item.description}</p>
          <p>{this.state.item.formattedAddress}</p>
        </div>
        <div>
          <img
            className="profileImg"
            src={this.state.item.creator.profileImg}
            alt=""
          />
          <p>Given away by {this.state.item.creator.firstName}</p>
        </div>
        <div>
          <p>
            Contact {this.state.item.creator.firstName} at{' '}
            {this.state.item.creator.email}
          </p>
        </div>
      </div>
    );
  }
}

export default CardItem;
