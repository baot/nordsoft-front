/**
 * Created by bao on 3/7/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

class Notification extends Component {

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this._notificationSystem.addNotification({
        message: nextProps.notification.message,
        level: nextProps.notification.level,
      });
    }
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem"/>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps, null)(Notification);
