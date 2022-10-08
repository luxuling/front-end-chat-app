export default function Loading() {
  const count = [1,2,3,4,5]
  return (
    count.map((x) => {
      return (<div key={x} className="w-full h-16 bg-slate-400 mt-5 rounded-lg p-1 cursor-pointer animate-pulse">

    </div>)
    })
  )
}