import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="px-5 py-10 md:w-1/4 bg-blue-900">
        <h2 className="text-4xl font-black text-center text-white">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          <NavLink
            className={({isActive}) => isActive ?
              'text-blue-300 block mt-2 text-2xl hover:text-blue-300':
              'text-white block mt-2 text-2xl hover:text-blue-300'
            }
            to='/'
          >
            Cliente
          </NavLink>
          <NavLink
            className={({isActive}) => isActive ?
              'text-blue-300 block mt-2 text-2xl hover:text-blue-300':
              'text-white block mt-2 text-2xl hover:text-blue-300'
            }
            to='/clientes/nuevo'
          >
            Nuevo Cliente
          </NavLink>
        </nav>
      </aside>
      <main className="p-10 md:w-3/4 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;