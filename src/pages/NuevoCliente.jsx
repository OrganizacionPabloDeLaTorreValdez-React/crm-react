import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { agregarCliente } from '../data/clientes'

export async function action({request}) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = datos.email;

  // Validación
  const errores = [];
  if(Object.values(datos).includes("")) {
    errores.push('Todos los campos son obligatorios');
  }

  const regexEmail = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
  if(!regexEmail.test(email)) {
    errores.push('El email no es válido');
  }

  // retornar datos si hay errores
  if(errores.length) {
    return errores;
  }

  await agregarCliente(datos);
  return redirect('/');
}

const NuevoCliente = () => {
  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        Nuevo Cliente
      </h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          className="px-3 py-1 bg-blue-800 text-white font-bold uppercase"
          // El menos 1 regresa a la página anterior
          // también pudiste usar navigate("/")
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className='md:w-3/4 mx-auto px-5 py-10 mt-20 bg-white shadow rounded-md'>
        {
          errores?.length && errores.map((error, i) =>
            <Error key={i}>{error}</Error>
          )
        }
        <Form
          method='POST'
          noValidate
        >
          <Formulario />
          <input 
            type='submit'
            className='p-3 mt-5 w-full uppercase font-bold text-white text-lg bg-blue-800'
            value='registrar cliente'
          />
        </Form>
        
      </div>
    </>
  );
}

export default NuevoCliente;