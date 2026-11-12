import { useLocation, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

/**
 * Компонент-защитник роутов.
 * Пропускает только тех, кто пришел через клик по кнопке с флагом `allowed: true`.
 */
type ButtonGuardProps = {
  children: ReactNode;
  redirectTo: string;
};

export function ButtonGuard({ children, redirectTo }: ButtonGuardProps) {
  const location = useLocation();
  const isAllowed = location.state?.allowed;

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}