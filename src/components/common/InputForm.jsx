const InputForm = ({ title, htmlValue, value, handleChange, placeholder }) => {
  return (
    <div className="mb-4 ">
      <label className="inline-block text-gray-700 mb-2" htmlFor={htmlValue}>
        {title}
      </label>
      <input
        className="bg-white border rounded-xl w-full py-2 px-3 placeholder:text-gray-400 text-gray-900"
        id={htmlValue}
        type={htmlValue}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        required
      />
    </div>
  );
};
export default InputForm;
