import React from 'react';

/**
 * Injects props into children all components.
 * @param {Object<any>} props props to inject into children components.
 * @param {PropTypes.node} children components to render with the injected props.
 */
const inject = (props = {}, children) =>
    React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, props) : child
    );

export { inject };
