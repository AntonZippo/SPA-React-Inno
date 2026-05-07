import react from "react";
import './Footer.css'
import { memo } from "react";

function Footer() {
  return (
    <div className="footer">
      <p>About | Contacts  | Powered</p>
    </div>
  );
}
export default memo(Footer);