import { actualizarCliente, obtenerCliente } from "../data/clientes";
import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({params}) {
  const clienteId = params.clienteId;
  const cliente = await obtenerCliente(clienteId);
  if(Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados',
    });
  }
  return cliente;
}

export async function action({request, params}) {
  const clienteId = params.clienteId;
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = datos.email;

  // Validación
  const errores = [];
  if(Object.values(datos).includes("")) {
    errores.push('Todos los compos son obligatorios');
  }

  const regexEmail = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
  if(!regexEmail.test(email)) {
    errores.push('El email no es válido');
  }

  // Retornar datos si hay errores
  if(errores.length) {
    return errores;
  }

  // Actualizar el cliente
  await actualizarCliente(clienteId,datos);
  return redirect('/');
}

const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        Editar Cliente
      </h1>
      <p className="mt-3">
        A contiuación podrás modificar los datos de un cliente
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
          <Formulario 
            cliente={cliente}
          />
          <input 
            type='submit'
            className='p-3 mt-5 w-full uppercase font-bold text-white text-lg bg-blue-800'
            value='guardar ambios'
          />
        </Form>
        
      </div>
    </>
  );
}

export default EditarCliente;