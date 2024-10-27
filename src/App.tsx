import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import VideosScreen from './pages/VideosScreen';
import VideoPlayerScreen from './pages/VideoPlayerScreen';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideosScreen />} />
          <Route path="/video/:id" element={<VideoPlayerScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;