export async function obtenerClientes() {
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(url)
  .then(res => res.ok ? res.json() : Promise.reject("error"))
  .catch(err => []);

  return response;
}

export async function obtenerCliente(id) {
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(`${url}/${id}`)
    .then(res => res.ok ? res.json() : Promise.reject("error"))
    .catch(err => {
      return {};
    });
  return response;
}

export async function agregarCliente(datos) {
  const url = import.meta.env.VITE_API_URL;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .catch(err => console.log(err));
}

export async function actualizarCliente(id, datos) {
  const url = import.meta.env.VITE_API_URL;
  await fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .catch(err => console.log(err));
}

export async function eliminarCliente(id) {
  const url = import.meta.env.VITE_API_URL;
  await fetch(`${url}/${id}`, {
    method: 'DELETE'
  })
  .catch(res => console.log(res));
}