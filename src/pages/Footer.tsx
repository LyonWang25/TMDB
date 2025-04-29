import  AMCBetter from '../assets/AMC_Better.svg'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div
        className="flex flex-row items-center justify-center gap-4 border-t 
      border-t-gray-600 py-8 md:gap-8"
      >
        <img src={AMCBetter} alt="AMC Better" />
      </div>
      <div>
        <p className="justify-self-end px-6 py-2">
          © 2025 AMC Theatres. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer