

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="loader border-4 border-t-primary border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
      <p className="text-center text-gray-600 mt-4">Loading...</p>
    </div>
  );
}
