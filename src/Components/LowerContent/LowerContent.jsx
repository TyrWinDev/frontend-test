import logo from '../../assets/logoepayco.png';

const LowerContent = () => {
  return (
    <div>
      <h3 style={{ fontStyle: 'italic', fontSize: 16, fontWeight: '300' }}>
        Los pagos son procesados de forma segura por ePayco
      </h3>
      <p style={{ margin: '0 auto' }}>
        Powered by <img alt='Logo de Epayco' src={logo} />
      </p>
    </div>
  );
};

export default LowerContent;
