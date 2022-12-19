import React, { Component } from "react";
import { removeFavItem } from "../../redux/actions";
import store from "../../redux/store";
import "./Favorites.css";
import { saveList } from "../../redux/actions";

class Favorites extends Component {
  state = {
    title: "",
    movies: [],
    link: "",
    submitted: false
  };
  componentDidMount() {
    this.setState({ movies: store.getState().favorites });
    this.setState({ inner: store.getState().inner });
    store.subscribe(() =>
      this.setState({ movies: store.getState().favorites })
    );
    store.subscribe(() =>
      this.setState({ inner: store.getState().inner })
    );
  }
  onDelete = (id) => {
    store.dispatch(removeFavItem(id));
  };
  submitHandler = (e) => {
    e.preventDefault();
    const info = {
      title: this.state.title,
      movies: [],
    };
    this.state.movies.forEach((item) => info.movies.push(item.imdbID));
    fetch("https://acb-api.algoritmika.org/api/movies/list", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ link: json.id });
        this.setState({ submitted: true });
        store.dispatch(saveList(this.state.link))
      });
  };
  render() {
    return (
      <div className="favorites">
        <form onSubmit={this.submitHandler}>
          <input
            placeholder="Введите название списка"
            onChange={(e) => this.setState({ title: e.target.value })}
            className="favorites__name"
            disabled={this.state.submitted}
          />
          <ul className="favorites__list">
            {this.state.movies.map((item) => {
              return (
                <li className="favorites__list-item" key={item.imdbID}>
                  {item.Title} ({item.Year}){" "}
                  <button
                    onClick={() => this.onDelete(item.imdbID)}
                    disabled={this.state.submitted}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
          {this.state.submitted ? (
            <a href={`/list/${this.state.link}`}>Перейти к списку</a>
          ) : (
            <button className="favorites__save" disabled={!this.state.title + !this.state.inner}>
              Сохранить список
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default Favorites;
