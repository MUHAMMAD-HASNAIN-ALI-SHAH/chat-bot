const NoChatSelectedComponent = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl lg:text-4xl font-bold">Welcome to Al Hasnain Chat bot</h1>
      <p className="text-lg lg:text-xl text-gray-500">
        Start you converstaion by selecting a chat from the left side bar or
        create a new chat
      </p>
    </div>
  );
};

export default NoChatSelectedComponent;
