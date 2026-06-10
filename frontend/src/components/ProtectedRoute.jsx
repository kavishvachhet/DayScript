import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">🚫</div>
          <h3>Access Denied</h3>
          <p>You need administrator privileges to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
}
