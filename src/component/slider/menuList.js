const menuList = [
    {name: '日历', icon: 'pie-chart', key: 1, href: '/calendar'},
    {name: '百度搜索', icon: 'desktop', key: 2, href: '/card'},
    {name: '语音识别', icon: 'inbox', key: 3, href: '/lamp'},
    {
        name: '实用工具', icon: 'bars', key: 4, href: '/example',
        child: [
            {name: '天气', icon: 'pie-chart', key: 5, href: '/example/1'},
            {name: '示例2', icon: 'pie-chart', key: 6, href: '/example/2'},
            {name: '示例3', icon: 'pie-chart', key: 7, href: '/example/3'},
            {name: '示例4', icon: 'pie-chart', key: 8, href: '/example/4'}
        ]
    },
    {
        name: '扩展', icon: 'mail', key: 9, href: '/extend',
        child: [
            {name: '扩展1', icon: 'pie-chart', key: 10, href: '/extend/1'},
            {name: '扩展2', icon: 'pie-chart', key: 11, href: '/extend/2'},
            {name: '扩展3', icon: 'pie-chart', key: 12, href: '/extend/3'},
            {name: '扩展4', icon: 'pie-chart', key: 13, href: '/extend/4'}
        ]
    },
];
export default menuList