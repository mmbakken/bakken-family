const Header = () => {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="flex flex-col">
        <span className="font-birthstone text-primary -mt-1 text-center text-6xl leading-20">
          Hilary & Matt
        </span>
        <span className="font-birthstone text-center text-2xl text-neutral-500">
          Saturday, October 11<sup className="ml-1 text-sm">th</sup> 2025
        </span>
      </h1>
    </header>
  )
}

export default Header
