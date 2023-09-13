import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import ChartHome from 'pages/ChartHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ChartHome />,
      },
    ],
  },
]);

export default router;
