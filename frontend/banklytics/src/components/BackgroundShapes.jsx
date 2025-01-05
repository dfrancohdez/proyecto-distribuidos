function BackgroundShapes({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-gray-50 overflow-hidden">
      {/* Figuras decorativas */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-300 to-purple-700 rounded-lg rotate-45 opacity-50"></div>
      <div className="absolute bottom-10 right-40 w-32 h-32 bg-gradient-to-br from-purple-300 to-purple-700 rounded-lg rotate-45 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-300 to-purple-700 rounded-lg rotate-45 opacity-50"></div>

      {/* Contenido principal */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BackgroundShapes;
