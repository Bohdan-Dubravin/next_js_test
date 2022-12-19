import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex justify-between bg-white max-w-6xl">
      <div className="relative w-24 h-10  hidden lg:inline-grid cursor-pointer">
        <h1>header</h1>
        <Image
          fill
          src="https://links.papareact.com/ocw"
        />
      </div>
      <div className="relative w-10 h-10 lg:hidden cursor-pointer">
        header
        <Image
          fill
          src="https://links.papareact.com/jjm"
        />
      </div>
      <div className="">
        <div>
          <Image
            fill
            src="https://links.papareact.com/jjm"
          />
        </div>
        <input
          type="text"
          placeholder="Search"
        />
      </div>
    </header>
  );
};
