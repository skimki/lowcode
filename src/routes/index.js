const Home = () => import(/*webpackChunkName: 'home'*/'@/pages/home')
const Preview = () => import(/*webpackChunkName: 'preview'*/'@/pages/preview')

const routes = [
  {
    path: '/',
    exact: true,
    element: Home,
    title: '低代码平台'
  },
  {
    path: '/preview',
    element: Preview,
    title: '预览'
  }
]

export default routes
