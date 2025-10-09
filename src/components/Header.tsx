import { LABELS } from '../constants/messages';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {LABELS.TITLE}
      </h1>
      <p className="text-lg text-gray-600">
        {LABELS.SUBTITLE}
      </p>
    </div>
  );
};

export default Header;
