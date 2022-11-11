import { useState } from 'react';
import './App.css';
import ListEmployees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/employees" element={<ListEmployees />} />

          {/* NO MATCH ROUTE */}
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>404 Page not found 😂😂😂</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
