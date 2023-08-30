import { obtenerClientes } from '../data/clientes'
import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';

export async function loader() {
  const clientes = await obtenerClientes();
  return clientes;
}

const Index = () => {
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        Clientes
      </h1>
      <p className="mt-3">
        Administra tus clientes
      </p>
      {
        clientes?.length ? 
        (
          <table className='mt-5 w-full bg-white shadow table-fixed'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='p-2'>
                  Clientes
                </th>
                <th className='p-2'>
                  Contacto
                </th>
                <th className='p-2'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-stone-500/10'>
              {
                clientes.map(cliente => (
                  <Cliente 
                    key={cliente.id}
                    cliente={cliente}
                  />
                ))
              }
            </tbody>
          </table>
        ) :
        (
          <p
            className='mt-10 text-center'
          >
            No hay clientes aún
          </p>
        )
      }
    </>
  );
}

export default Index;