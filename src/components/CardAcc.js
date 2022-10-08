export default function CardAcc({ name, pic, email, accessChatHandler }) {
  return (
    <div
      className="bg-secondary rounded-md w-full h-16 mb-2 flex justify-start p-3 hover:bg-third transition-all ease-in-out duration-200 cursor-pointer"
      onClick={accessChatHandler}>
      <div>
        <img
          src={pic}
          alt=""
          className="w-10 border-2 border-third rounded-full"
        />
      </div>
      <div className="ml-3 flex flex-col">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-xs">{`Email: ${email}`}</p>
      </div>
    </div>
  );
}
