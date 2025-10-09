const Footer: React.FC = () => {
  return (
    <div className="mt-8 text-center text-sm text-gray-600">
      <p>
        Dados fornecidos pela{' '}
        <a
          href="https://developers.receitaws.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 underline"
        >
          ReceitaWS API
        </a>
      </p>
    </div>
  );
};

export default Footer;
