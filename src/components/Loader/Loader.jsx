import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Loader.module.scss";

export function Loader({ loading }) {
  return (
    <>
      <span className={clsx({ [styles.dash]: loading })}>-</span>
      <span className={clsx({ [styles.dash]: loading })}>-</span>
    </>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool,
};
