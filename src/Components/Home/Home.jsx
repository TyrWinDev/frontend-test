import React from 'react';
import AppContainer from '../Container/AppContainer';
import logo from '../../assets/logoepayco.png';

import './Home.css';

const Home = () => {
  return (
    <div>
      <section className='white-bg'>
        <div className='center'>
          <div className='form'>
            <AppContainer />
          </div>
          <div>
            <h3>Los pagos son procesados de forma segura por ePayco</h3>
            <p>
              Powered by <img alt='Logo de Epayco' src={logo} />
            </p>
          </div>
        </div>
        <div class='custom-shape-divider-bottom-1630373554'></div>
      </section>
    </div>
  );
};

export default Home;
