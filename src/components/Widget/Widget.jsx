import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Widget.module.scss";

export function Widget({ title, className, classes, children }) {
  return (
    <div className={clsx(styles.widget, className, classes?.root)}>
      <div className={clsx(styles.title, classes?.title)}>{title}</div>

      <div className={clsx(styles.content, classes?.content)}>{children}</div>
    </div>
  );
}

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.node,
};
