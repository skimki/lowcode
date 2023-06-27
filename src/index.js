import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter, useNavigate, useLocation, useParams } from 'react-router-dom'
import '@/index.css';
import reportWebVitals from '@/reportWebVitals';
import routeList from '@/routes'

const root = ReactDOM.createRoot(document.getElementById('root'));

function WithRouter (Component) {
  return function RouteElement (props) {
    const naviagtion = useNavigate()
    const params = useParams()
    const location = useLocation()
    // document.title = props.title
    return <Component
      {...props}
      history={
        naviagtion,
        params,
        location
      } />
  }
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {routeList.map((item, i) => {
          if (typeof item.element === 'function') {
            const RouteDom = WithRouter(lazy(item.element))
            item.element = <Suspense fallback={<div>loading...</div>}>
              <RouteDom />
            </Suspense>
          }
          return <Route {...item} key={i} />
        })}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
