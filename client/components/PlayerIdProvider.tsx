import { usePlayerIdStorage } from '../modules/hooks/usePlayerIdStorage';

const PlayerIdProvider: React.FC = ({ children }) => {
  usePlayerIdStorage();
  return <>{children}</>;
};

export { PlayerIdProvider };
