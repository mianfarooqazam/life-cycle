export default function TitleHeader({ children, className = "" }) {
    return (
      <h2 
        className={`text-2xl font-bold mb-6 text-center ${className}`}
        style={{
          backgroundColor: "#2663eb",
          padding: "12px 20px",
          borderRadius: 5,
          color: "#fff"
        }}
      >
        {children}
      </h2>
    );
  }