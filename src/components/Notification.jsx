import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../features/notification/notificationSlice";

const Notification = () => {
  const { notificationMessage, notificationType } = useSelector(
    (state) => state.Notification
  );
  const dispatch = useDispatch();

  const getBackgroundColor = () => {
    switch (notificationType) {
      case "success":
        return "bg-green-950";
      case "warning":
        return "bg-yellow-700";
      default:
        return "bg-blue-500";
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, 2000);

    // Clean up the timeout on component unmount or when a new notification is shown
    return () => clearTimeout(timeoutId);
  }, [notificationMessage, dispatch]);

  if (!notificationMessage) {
    return null;
  }

  return (
    <div
      className={`fixed top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-between px-4 py-2 rounded-md shadow-md text-white ${getBackgroundColor()}`}
    >
      <div className="flex items-center">
        <div className="mr-2 text-lg">
          {notificationType === "success" ? "✅" : "⚠️"}
        </div>
        <div className="text-md">{notificationMessage}</div>
      </div>
    </div>
  );
};

export default Notification;
