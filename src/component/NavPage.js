import React from 'react';

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const DocItem = ({ title, link, ...props }) => {
  return (
    <div {...props}>
      <a className="w-full text-gray-800" href={`/sheet/${link ? link : ''}`}>
        <p>{title}</p>
      </a>
      <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-300 border-red-300 hover:text-white hover:bg-red-300">
        <TrashIcon />
      </button>
    </div>
  );
};

const NavPage = () => {
  return (
    <div className="bg-white rounded shadow w-full lg:w-3/4 lg:max-w-lg">
      <div className="mb-4 p-10">
        <h1 className="text-gray-700 text-4xl font-bold">Your Docs</h1>
        <div className="flex mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Create a new sheet..."
          ></input>
          <button className="flex-no-shrink p-2 border-2 rounded text-green-300 border-green-300 hover:text-white hover:bg-green-300">
            Add
          </button>
        </div>
      </div>
      <div className="divide-y">
        <DocItem
          title="Hello"
          link="Hello"
          className="flex pb-4 pt-4 pl-10 pr-10 items-center hover:bg-gray-50"
        />
        <DocItem
          title="Hello, world"
          className="flex pb-4 pt-4 pl-10 pr-10 items-center hover:bg-gray-50"
        />
        <DocItem
          title="✔️ Awesome spreadsheet!"
          className="flex pb-4 pt-4 pl-10 pr-10 items-center hover:bg-gray-50"
        />
      </div>
    </div>
  );
};

export default NavPage;
