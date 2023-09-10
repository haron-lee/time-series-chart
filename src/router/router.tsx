import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import Chart from 'pages/Chart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Chart />,
      },
    ],
  },
]);

export default router;
