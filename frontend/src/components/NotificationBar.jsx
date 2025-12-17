import { useSocket } from "../context/SocketContext";
import axios from "axios";
axios.get(`${import.meta.env.VITE_API_URL}/api/products`);

const NotificationBar = () => {
  const { notifications, clearNotification, clearAllNotifications } =
    useSocket();

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          background: "rgba(30, 30, 30, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7)",
          border: "2px solid #ef4444",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              color: "#ef4444",
              margin: 0,
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            🔔 Low Stock Alerts ({notifications.length})
          </h3>
          <button
            onClick={clearAllNotifications}
            style={{
              background: "transparent",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: "5px 10px",
            }}
          >
            Clear All
          </button>
        </div>

        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                borderLeft: "4px solid #ef4444",
                position: "relative",
              }}
            >
              <button
                onClick={() => clearNotification(notif.id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              <div
                style={{
                  color: "#f3f4f6",
                  fontSize: "0.95rem",
                  marginBottom: "5px",
                  paddingRight: "20px",
                }}
              >
                <strong>{notif.name}</strong>
              </div>
              <div
                style={{
                  color: "#ef4444",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                Stock: {notif.stock} units
              </div>
              <div
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  marginTop: "5px",
                }}
              >
                {new Date(notif.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
