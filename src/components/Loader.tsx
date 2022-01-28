import '../styles/loader.css'

const Loader = (): JSX.Element => {
  return (
    <div className="h-10 w-full flex justify-center items-center">
      <div className="loader bg-gradient-to-tl from-green-300 to-gray-300 h-[36px] w-[36px]" />
    </div>
  )
}

export default Loader
