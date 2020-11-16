import React,{ Fragment, useState } from 'react';
import Error                        from './Error.component';
import PropTypes                    from 'prop-types';

const Formulario = ({ busqueda, setBusqueda, setConsume }) => {

    const [ error , setError ] = useState(false);
    const { ciudad , pais } = busqueda;

    const handleChange = ( event )=> {
        setBusqueda({
            ...busqueda,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        if( ciudad.trim() === '' || pais.trim() === ''){
            setError(true);
            return;
        }
        setError(false);
        setConsume(true);
    }

    return ( 
        <Fragment>
            <form
                onSubmit={ handleSubmit }
            >
                { error ? <Error mensaje="Todos los campos son obligatorios"/> : null }
                <div className="input-field col s12">
                    <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        value = {ciudad}
                        onChange ={ handleChange }
                    />
                    <label htmlFor="ciudad">Ciudad:</label>
                </div>
                <div className="input-field col s12">
                    <select
                        name="pais"
                        value={pais}
                        onChange ={ handleChange }
                    >
                        <option>--Selecione un país --</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option> 
                    </select>
                    <label htmlFor="ciudad">Pais:</label>
                </div>
                <div className="input-field">
                    <input
                        type="submit"
                        value="Buscar Clima"
                        className="btn-large btn-block yellow accent-4 col s12"
                    />
                </div>
            </form>
        </Fragment>
    );
}
 
Formulario.propTypes = {
    busqueda    : PropTypes.object.isRequired,
    setBusqueda : PropTypes.func.isRequired,
    setConsume  : PropTypes.func.isRequired,
}
export default Formulario;