// components/SubmitError.jsx
export default function SubmitError({ message }) {
  if (!message) return null;

  return (
    <p className="text-xs text-center mt-1 mb-3" style={{ color: "#dc3545" }}>
      {message}
    </p>
  );
}