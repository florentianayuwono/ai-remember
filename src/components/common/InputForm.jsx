const InputForm = ({ title, value,htmlValue,  handleChange, placeholder }) => {
  // text input area is adjustable for content
  const isContent = htmlValue === "content";

  return (
    <div className="mb-4 ">
      <label className="inline-block text-gray-700 mb-2" htmlFor={htmlValue}>
        {title}
      </label>
      
      {isContent ? (
        <textarea
          className="bg-white border rounded-xl w-full py-2 px-3 h-40 placeholder:text-gray-400 text-gray-900 overflow-y-auto"
          id={htmlValue}
          type={htmlValue}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
      ) : (
        <input
          className="bg-white border rounded-xl w-full py-2 px-3 placeholder:text-gray-400 text-gray-900"
          id={htmlValue}
          type={htmlValue}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
      )}
    </div>
  );
};
export default InputForm;
