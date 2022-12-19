import React, { Component } from 'react';
import './ListPage.css';
import store from '../../redux/store';
import { loadList } from '../../redux/actions';

class ListPage extends Component {
    state = {
        loading: true,
        movieList: [],
        error: '',
        load: false,
        title: ''
    }
    componentDidMount() {
        store.dispatch(loadList())
        this.setState({title: store.getState().title})
        this.setState({movieList: store.getState().movieList})
        this.setState({loading: store.getState().loading})
        this.setState({error: store.getState().error})
        store.subscribe(() => this.setState({title: store.getState().title}))
        store.subscribe(() => this.setState({movieList: store.getState().movieList}))
        store.subscribe(() => this.setState({loading: store.getState().loading}))
        store.subscribe(() => this.setState({error: store.getState().error}))
        setTimeout(() => {
            this.setState({load: true})
        }, 3000);
    }
    render() {
        if (!this.state.load) return (
            <div className="list-page"></div>
        )
        console.log(this.state.movieList)
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {!this.state.movieList.length && this.state.loading &&
                    <p></p>}
                    {this.state.movieList.length && this.state.loading ?
                    this.state.movieList.map(() => {
                        return <li>Loading...</li>
                    })
                    :
                    null
                    }
                    {this.state.movieList.length && !this.state.loading ?
                    this.state.movieList.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })
                    :
                    null
                    }
                </ul>
            </div>
        );
    }
}
 
export default ListPage;

