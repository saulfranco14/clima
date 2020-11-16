import React,{Fragment, useState, useEffect } from 'react';
import Header                                 from './components/Header.component';
import Formulario                             from './components/Formulario.component';
import Clima                                  from './components/Clima.component';
import Error                                  from './components/Error.component';

function App() {

  const [ busqueda, setBusqueda ] = useState({
    ciudad : '',
    pais :''
  });

  const[ consume , setConsume ]     = useState(false);
  const[ resultado , setResultado ] = useState({});
  const[ error, setError ]          = useState(false);
  let componente;
  const { ciudad , pais } = busqueda;

  useEffect(() => {
      
    const consultarAPI = async () => {
      console.log("consulta API.....");
      const APIKEY  = '527659a424afa1c6f39a3abe3a8c76df';
      // const APIKEY = '';
      const url     = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${APIKEY}`;
      if(consume){
        console.log("consumiendo API......");
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsume(false);
        console.log("Consulto API exitosamente...");
        console.log(resultado.cod);
        {  resultado.cod === '404'  ? setError(true): setError(false) }
      }
    }

    consultarAPI();
  }, [ consume ]);

  { error ? componente =  <Error mensaje="No hay resultados exitosos"/> : componente =   <Clima resultado = { resultado } /> }
 
  return (
    <Fragment>
      <Header
        titulo='Clima Weather App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda    = { busqueda }
                setBusqueda = { setBusqueda }
                setConsume  = { setConsume }
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}



export default App;
