import toastStyle from "../styles/NetworkToastCard.module.css";
import greenWifiIcon from "../assets/icon-wifi-green-64.svg";
import redWifiIcon from "../assets/icon-wifi-red-64.svg";

export function NetworkToastCard({ isOnline, isShown }) {
  return (
    <div
      id="toast-card-wrapper"
      className={`
          ${toastStyle.network_toast_wrapper} 
          ${isOnline ? toastStyle.online : toastStyle.offline}
          ${isShown ? toastStyle.show : toastStyle.hide}
        `}
    >
      <div className={toastStyle.network_toast_content}>
        <img src={isOnline ? greenWifiIcon : redWifiIcon} />
        <div className={toastStyle.network_toast_message}>
          <h4>{isOnline ? "You're online now" : "You're offline"}</h4>
          <p>
            {isOnline
              ? "Internet is Connected to your device."
              : "No internet connection detected."}
          </p>
        </div>
        {/* <button>X</button> */}
      </div>
    </div>
  );
}
