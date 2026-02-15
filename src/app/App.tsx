import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CheckProvider } from './context/CheckContext';

export default function App() {
  return (
    <CheckProvider>
      <RouterProvider router={router} />
    </CheckProvider>
  );
}