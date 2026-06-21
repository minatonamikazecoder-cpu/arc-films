export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-black)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-left-color: var(--blue-bright, #3b82f6);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
