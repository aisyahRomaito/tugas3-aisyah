export default function Footer() {
  return (
    <footer className="bg-white-800 py-8 px-4 text-center">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold ">
          © 2024 Getch. All rights reserved.
        </h1>
      </div>
      <div className="flex justify-center mt-4">
        <a href="#" className="inline-block mr-4 text-teal-500 hover:text-teal-700 transition duration-400">Facebook</a>
        <a href="#" className="inline-block mr-4 text-pink-600 hover:text-pink-700 transition duration-400">Twitter</a>
        <a href="#" className="inline-block text-orange-500 hover:text-orange-700 transition duration-400">Instagram</a>
      </div>
    </footer>
  );
}
