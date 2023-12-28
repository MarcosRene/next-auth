import PrivateRoute from '@/components/PrivateRouter';

export default function Dashboard() {
  return (
    <PrivateRoute>
      <h1>Dashboard</h1>
    </PrivateRoute>
  );
}
