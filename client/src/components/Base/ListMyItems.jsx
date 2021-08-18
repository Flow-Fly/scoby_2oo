import React from 'react';
import apiHandler from '../../api/apiHandler';
import '../../styles/ListMyItems.css';

class ListMyItems extends React.Component {
  state = {
    myItems: null,
  };
  async componentDidMount() {
    try {
      const res = await apiHandler.getUserItems();
      this.setState({
        myItems: res,
      });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    if (this.state.myItems === null)
      return <div className="loading">Loading...</div>;
    return (
      <div className="list-items">
        {this.state.myItems.length === 0 && (
          <div className="CardItem">
            <div className="item-empty">
              <div className="round-image">
                <img src="/media/personal-page-empty-state.svg" alt="" />
              </div>
              <p>You don't have any items :(</p>
            </div>
          </div>
        )}
        {this.state.myItems.length > 0 &&
          this.state.myItems.map((item) => {
            return (
              <div key={item._id} className="user-item-card">
                <h3>Your items</h3>
                <div className="item">
                  <div className="round-image">
                    <img src={item.image} alt="item" />
                  </div>
                  <div className="description">
                    <h2>{item.name}</h2>
                    <h4>Quantity: {item.quantity} </h4>
                    <p>{item.description}</p>
                    <div className="buttons">
                      <button className="btn-secondary">Delete</button>

                      <button className="btn-primary">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ListMyItems;
