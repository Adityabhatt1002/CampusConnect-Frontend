const InputField = ({ type, name, placeholder, value, onChange }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 rounded"
      />
    );
  };
  
  export default InputField;
  