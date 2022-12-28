import payment from "../../images/payment.png";
import "./Footer.scss";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Men</span>
          <span>Women</span>
          <span>Children</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>About Riviera</h1>
          <span>News</span>
          <span>Carriers</span>
          <span>Investors</span>
          <span>Sustainability</span>
        </div>
        <div className="item">
          <h1>Get Help</h1>
          <span>Order Status</span>
          <span>Shipping</span>
          <span>Returns</span>
          <span>Payment Options</span>
          <span>Contact Us</span>
        </div>
        <div className="item">
          <h1>Join us</h1>
          <span>Riviera App</span>
          <span>Riviera Club</span>
          <span>Riviera Training Club</span>
          <span>SNKRS</span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Riviera</span>

          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src={payment} alt="payment options" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
