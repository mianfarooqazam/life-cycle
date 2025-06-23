import toast from 'react-hot-toast';

export default function SaveButton({ 
  onClick, 
  successMessage = 'Saved Successfully',
  errorMessage = '',
  className = '',
  disabled = false,
  children
}) {
  const handleClick = () => {
    if (onClick && !disabled) {
      const result = onClick();
      
      // Only show success toast if onClick returns true
      if (result === true) {
        toast.success(successMessage, {
          duration: 3000,
          position: 'top-center',
        });
      } else if (result === false && errorMessage) {
        toast.error(errorMessage, {
          duration: 3000,
          position: 'top-center',
        });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        bg-[#5BB045] text-white 
        font-semibold 
        rounded-lg 
        shadow-md shadow-[#5BB045]/30 
        transition-all duration-300 ease-in-out
        hover:bg-[#4a9537] 
        hover:text-white 
        hover:-translate-y-0.5 
        hover:shadow-lg hover:shadow-[#5BB045]/40
        active:translate-y-0 
        active:shadow-md active:shadow-[#5BB045]/30
        disabled:bg-gray-300 
        disabled:text-gray-500 
        disabled:shadow-none 
        disabled:transform-none 
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children || 'Save'}
    </button>
  );
}