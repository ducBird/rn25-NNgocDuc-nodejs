import { useState } from 'react';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ListEmployees from './pages/Management/Employees';
import Categories from './pages/Management/Categories';
import Products from './pages/Management/Products';
import Orders from './pages/Sales/Orders';
import Customers from './pages/Management/Customers';
import Suppliers from './pages/Management/Suppliers';
import SiderMenu from './components/SiderMenu';
import HeaderMenu from './components/HeaderMenu';

import { Layout, Menu } from 'antd';
import SearchOrdersByStatus from './pages/Sales/Query/SearchOrdersByStatus';

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Header className="header">
            <div className="logo"></div>
            <HeaderMenu />
          </Header>
          <Layout>
            <Sider
              theme="light"
              width={200}
              style={{ minHeight: '100vh' }}
              className="site-layout-background"
            >
              <SiderMenu />
            </Sider>
            <Layout
              style={{
                padding: '0 20px',
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: '10px 2px',
                  minHeight: 280,
                }}
              >
                <Routes>
                  {/* HOME */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  {/* MANAGEMENT */}
                  <Route
                    path="/management/employees"
                    element={<ListEmployees />}
                  />
                  <Route
                    path="/management/categories"
                    element={<Categories />}
                  />
                  <Route path="/management/products" element={<Products />} />
                  <Route path="/management/customers" element={<Customers />} />
                  <Route path="/management/suppliers" element={<Suppliers />} />
                  {/* SALES */}
                  <Route path="/sales/orders" element={<Orders />} />
                  <Route
                    path="orders/status"
                    element={<SearchOrdersByStatus />}
                  />
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
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
