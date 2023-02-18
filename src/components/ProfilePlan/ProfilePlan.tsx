import "./ProfilePlan.scss";
import CheckBox from "../../images/Checkbox.svg";
const ProfilePlan = () => {
  //todo Add translations
  //todo Add dynamic render for the profile plan based on their profile plan listed on stripe
  return (
    <div className="profile-plan">
      <div className="card-container">
        <div className="badge" />
        <div className="profile-plan-details">
          <h5>Golden Child</h5>
          <div className="price-container">
            <span className="price">
              <span>
                <sup>$ </sup>
              </span>
              <span>25</span>
            </span>
            <span className="month"> / month</span>
          </div>
          <div className="features">
            <div className="features-title">Features included:</div>
            <div className="feature">
              <img src={CheckBox} alt="checkbox" />
              <div className="feature-text">
                <span className="highlighted">Free delivery </span>
                <span>for every order.</span>
              </div>
            </div>
            <div className="feature">
              <img src={CheckBox} alt="checkbox" />

              <div className="feature-text">
                <span className="highlighted">Bonus item</span>
                <span> for each order.</span>
              </div>
            </div>
            <div className="feature">
              <img src={CheckBox} alt="checkbox" />

              <div className="feature-text">
                <span className="highlighted">Chosen item </span>
                <span>at the end of month.</span>
              </div>
            </div>
          </div>
          <button className="upgrade">Downgrade Plan</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePlan;
