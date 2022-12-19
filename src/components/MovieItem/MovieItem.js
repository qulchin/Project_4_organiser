import React, { Component } from 'react';
import './MovieItem.css';
import store from '../../redux/store';
import { addToList } from '../../redux/actions';

class MovieItem extends Component {
    state = {
        loaded: null,
        added: []
    }
    componentDidMount() {
        this.setState({added: store.getState().favorites})
        store.subscribe(() => {this.setState({added: store.getState().favorites})})
    }
    onClick = (imdbID) => {
        store.dispatch(addToList(imdbID))
    }
    render() {
        const { imdbID, Title, Year, Poster } = this.props;
        return (
            <article className="movie-item">
                {this.state.loaded ? null :
                    <div className="not-found">No poster :</div>
                }
                <img className="movie-item__poster" style={this.state.loaded ? {} : {display: 'none'}} src={Poster} alt={Title} onLoad={() => this.setState({loaded: true})} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    {!this.state.added.find(item => item.imdbID === imdbID) ?
                        <button type="button" className="movie-item__add-button" onClick={() => this.onClick(imdbID)}>Добавить в список</button>
                    :
                        <button type="button" className="movie-item__add-button" onClick={() => this.onClick(imdbID)} disabled>Добавлено</button>
                    }
                </div>
            </article>
        );
    }
}
 
export default MovieItem;