export default function SelectedCard({name,functionHandler}) {
  return (
    <div className="bg-third rounded-xl p-1 h-9 w-20 overflow-hidden items-center flex justify-evenly ml-2 mb-3">
      <h1 className="text-center font-light text-sm text-white">{name}</h1>
      <button className="text-white flex text-sm" onClick={functionHandler}><span className="material-symbols-outlined text-base">close</span></button>
    </div>
  )
}