import toast from 'react-hot-toast';

export default function SaveButton({ 
  onClick, 
  successMessage = 'Saved Successfully',
  errorMessage = '',
  className = '' 
}) {
  const handleClick = () => {
    if (onClick) {
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
      className={`px-6 py-2 bg-[#3b83f6] text-white font-medium rounded-md hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#3b83f6] focus:ring-offset-2 transition-colors ${className}`}
    >
      Save
    </button>
  );
}