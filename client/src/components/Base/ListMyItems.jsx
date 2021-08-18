import React from 'react';
import apiHandler from '../../api/apiHandler';
import '../../styles/ListMyItems.css';
import UserCardItem from '../Base/UserItemCard'

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

   deleteItem = async (id) => {
    try {
      await apiHandler.deleteItem(id);
      const res = await apiHandler.getUserItems();
      this.setState({
        myItems: res,
      });
    } catch (e) {console.error(e)}
    
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
              <UserCardItem item={item} deleteItem={() => {this.deleteItem(item._id)}}/>
            );
          })}
      </div>
    );
  }
}

export default ListMyItems;
