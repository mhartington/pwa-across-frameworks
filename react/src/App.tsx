import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { musickitConfig } from './services/musickit-config';
musickitConfig.configure();

const LandingPage = lazy(() => import('./pages/landing/Landing'));
const BrowsePage = lazy(() => import('./pages/browse/Browse'));
const AlbumPage = lazy(() => import('./pages/album/Album'));
const PlaylistPage = lazy(() => import('./pages/playlist/Playlist'));
const SearchPage = lazy(() => import('./pages/search/Search'));

class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <Link to="/browse">Browse</Link> | <Link to="/search">Search</Link> |{' '}
          <span onClick={() => console.log('click')}>Login</span>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/album/:id" component={AlbumPage} />
          <Route path="/playlist/:id" component={PlaylistPage} />
          <Route path="/search" component={SearchPage} />
        </Suspense>
      </Router>
    );
  }
}
export default App;
