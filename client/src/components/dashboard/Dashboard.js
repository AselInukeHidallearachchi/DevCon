import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ auth: { user } }) => {
  return (
    <section className="container">
      <h1>Dashboard</h1>
      <p>Welcome {user && user.name}</p>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
