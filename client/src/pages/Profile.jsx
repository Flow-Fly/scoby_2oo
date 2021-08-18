import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withUser } from '../components/Auth/withUser';
import '../styles/Profile.css';
import '../styles/CardItem.css';
import Button from '../components/Base/Button';
import apiHandler from '../api/apiHandler';
import ListMyItems from '../components/Base/ListMyItems';

class Profile extends Component {
  state = {
    user: null,
    phoneNumber: '',
  };
  async componentDidMount() {
    try {
      const res = await apiHandler.isLoggedIn();
      this.setState({
        user: res,
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      phoneNumber: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await apiHandler.editUser({
      phoneNumber: this.state.phoneNumber,
    });
  };

  render() {

    const { authContext } = this.props;
    const { user } = authContext;
    if (this.state.user === null)
      return <div className="loading">Loading...</div>;
    return (
      // <div style={{ padding: "100px", fontSize: "1.25rem" }}>
      //   <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
      //     This is profile, it's protected !
      //   </h2>
      //   <p>
      //     Checkout the<b>ProtectedRoute</b> component in
      //     <code>./components/ProtectRoute.jsx</code>
      //   </p>
      //   <a
      //     style={{ color: "dodgerblue", fontWeight: "bold" }}
      //     target="_blank"
      //     rel="noopener noreferrer"
      //     href="https://reacttraining.com/react-router/web/example/auth-workflow"
      //   >
      //     React router dom Demo of a protected route
      //   </a>
      <section className="Profile">
        <div className="user-image round-image">
          <img src={user.profileImg} alt={user.firstName} />
        </div>
        <div className="user-presentation">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <Link className="link" to="/profile/settings">
            Edit profile
          </Link>
        </div>

        {!this.state.user.phoneNumber && (
          <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
              <Button className="form__button">Add phone number</Button>
            </form>
          </div>
        )}

        {/* Break whatever is belo  */}

        <ListMyItems/>

        {/* <div className="CardItem">
          <h3>Your items</h3>
          <div className="item">
            <div className="round-image">
              <img
                src="https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100"
                alt="item"
              />
            </div>
            <div className="description">
              <h2>Name of item</h2>
              <h4>Quantity: 1 </h4>
              <p>Description of the item</p>
              <div className="buttons">
                <span>
                  <button className="btn-secondary">Delete</button>
                </span>
                <span>
                  <button className="btn-primary">Edit</button>
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    );
  }
}
export default withUser(Profile);
