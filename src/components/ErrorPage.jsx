import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="space-y-8">
      <h1 className="text-center text-6xl font-extrabold text-blue-900">
        CRM - Clientes
      </h1>
      <p className="text-center font-semibold text-red-500">{`Error: ${error.message || error.statusText}`}</p>
    </div>
  );
}

export default ErrorPage;