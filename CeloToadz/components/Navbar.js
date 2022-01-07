import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [setMounted]);

  return (
    <div className="w-full shadow-lg">
      <header className="flex flex-col items-center px-4 py-2 bg-white sm:flex-row nav">
        <div className="flex items-center justify-between flex-1 font-medium">
          <NextLink href="/">
            <div className="flex items-center cursor-pointer">
              <img
                src="/images/Website logo.png"
                alt="logo"
                className="object-contain mr-1 w-14"
              />
              <h3 className="font-semibold">CeloToadz</h3>
            </div>
          </NextLink>
        </div>

        <nav>
          <ul className="flex items-center justify-between text-base text-gray-700">
            <li className="mr-5">
              <a href="#toadmap">
                <div className="p-2 font-bold transition-all duration-300 rounded-lg hover:bg-primary-200 hover:text-primary-100">
                  Toadmap
                </div>
              </a>
            </li>
            <li className="mr-5">
              <a href="#faq">
                <div className="p-2 font-bold transition-all duration-300 rounded-lg hover:bg-primary-200 hover:text-primary-100">
                  FAQ
                </div>
              </a>
            </li>
            <li className="mr-5">
              <a href="#team">
                <div className="p-2 font-bold transition-all duration-300 rounded-lg hover:bg-primary-200 hover:text-primary-100">
                  Team
                </div>
              </a>
            </li>
            <li className="mr-5">
              <a
                href="https://discord.gg/TZWQPGkVkS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 transition-all duration-300 rounded-lg hover:bg-primary-200 hover:text-primary-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/c_ToadzOfficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 transition-all duration-300 rounded-lg hover:bg-primary-200 hover:text-primary-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;