import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd'
import Head from './component/header/header'
import Foot from './component/footer/foot'
import SliderCpt from './component/slider/sliderCpt'
import Myroute from './router/router'
import Root from './Root'
import {BrowserRouter as Router} from 'react-router-dom'
const {Header, Footer, Sider, Content} = Layout;

class App extends Component {

    componentWillMount () {
        window.Root = Root.init();
    }

  render() {
    return (
        <Layout style={{height: '100%' }}>
            <Header>
                <Head />
            </Header>

            <Layout>
                <Sider>
                    <SliderCpt />
                </Sider>

                <Content >
                    <Myroute />
                </Content>
            </Layout>

            <Footer style={{ background: '#001529'}}>
                <Foot />
            </Footer>
        </Layout>
    );
  }
}

export default App;
