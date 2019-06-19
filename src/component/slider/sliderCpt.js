import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Router, Link } from 'react-router-dom';
import menuList from './menuList'
const SubMenu = Menu.SubMenu;



 export default class sliderCpt extends Component {
    constructor(props) {
        super();
        this.state = {
            collapsed: false,
        }
    }


    toggleCollapsed ()  {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    loadMenuList (menus) {
        return menus.map(menu => {
            console.log(menu.href);
            if(menu.child) {
                return (
                    <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}>
                        {this.loadMenuList(menu.child)}
                    </SubMenu>
                )
            }
            return (<Menu.Item key={menu.key}>
                <Link to={menu.href}>
                    <Icon type={menu.icon} />
                    <span className='menu-title'>{ menu.name }</span>
                </Link>
            </Menu.Item>)
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => {this.toggleCollapsed()}} style={{ marginBottom: 16, float: 'left' }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['4', '9']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {this.loadMenuList(menuList)}
                </Menu>
            </div>
        )
    }

    /*<Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>日历</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>卡片</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="inbox" />
                        <span>走马灯</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>组件示例</span></span>}>
                        <Menu.Item key="5">1</Menu.Item>
                        <Menu.Item key="6">2</Menu.Item>
                        <Menu.Item key="7">3</Menu.Item>
                        <Menu.Item key="8">4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2"
                             title={<span><Icon type="mail" /><span>扩展</span></span>}
                    >
                        <Menu.Item key="9">a</Menu.Item>
                        <Menu.Item key="10">b</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">1</Menu.Item>
                            <Menu.Item key="12">2</Menu.Item>
                        </SubMenu>
                    </SubMenu>*/
}
