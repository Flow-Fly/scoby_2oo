import React, { Component } from 'react';
import LocationAutoComplete from '../LocationAutoComplete';
import Button from '../Base/Button';
import '../../styles/form.css';

class ItemForm extends Component {
  state = {
    // items: null,
    name: "",
    category: "",
    quantity: 0,
    formattedAddress: "",
    location: {},
    description: "",
    contact: "",
    image: ""
  };

  handleChange = (event) => {
    const key = event.target.name;
    let value
    if(event.target.type === "file") {
      value = event.target.files[0]
    } else {
      value = event.target.value;
    }
     
    // console.log(key, value)

    this.setState({
      [key] : value,
    });
  }

  buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    // formData.append("name", this.state.name);
    // formData.append("category", this.state.category);
    // formData.append("quantity", this.state.quantity);
    // formData.append("formattedAddress", this.state.formattedAddress);
    // formData.append("description", this.state.description);
    // formData.append("contact", this.state.contact);
    // formData.append("image", this.state.image);

    this.buildFormData(formData, this.state)


    // formData.append("location", this.state.location)

    // for(let values of formData.values()) {
    //   console.log(values)
    // }

    console.log(formData.get("location"))

    // console.log(formData.getAll("location"))

    // console.log(formData.values())

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };


  

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.

    console.log(place);

    this.setState({
      formattedAddress: place.place_name,
      location: place.geometry
    })

  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={this.state.name}
              className="input"
              type="text"
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" defaultValue="-1" name="category" value={this.state.category} onChange={this.handleChange}>
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input className="input" id="quantity" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              className="text-area"
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" id="image" type="file" onChange={this.handleChange}/>
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" name="contact" value="email" onChange={this.handleChange}/>
              user email
            </div>
            <input type="radio" name="contact" value="phone" onChange={this.handleChange}/>
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <Button className="btn-submit">Add Item</Button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
