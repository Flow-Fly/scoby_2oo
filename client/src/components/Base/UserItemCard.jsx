import React from "react";

class UserItemCard extends React.Component {
    render (props) {
        return (
            <div key={this.props.item._id} className="user-item-card">
                <h3>Your items</h3>
                <div className="item">
                  <div className="round-image">
                    <img src={this.props.item.image} alt="item" />
                  </div>
                  <div className="description">
                    <h2>{this.props.item.name}</h2>
                    <h4>Quantity: {this.props.item.quantity} </h4>
                    <p>{this.props.item.description}</p>
                    <div className="buttons">
                      <button className="btn-secondary" onClick={() => {this.props.deleteItem(this.props.item._id)}}>Delete</button>
                      <button className="btn-primary">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

export default UserItemCard
