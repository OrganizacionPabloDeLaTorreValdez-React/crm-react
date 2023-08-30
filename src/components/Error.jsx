const Error = ({children}) => {
  return (
    <div className="my-4 p-3 bg-red-600 text-center font-bold uppercase text-white">
      {children}
    </div>
  );
}

export default Error;