export default function TextInput({ 
    label, 
    name, 
    value, 
    onChange, 
    type = 'text', 
    placeholder = '',
    disabled = false 
  }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }