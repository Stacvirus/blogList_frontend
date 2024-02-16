import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    function handleVisibility() {
        setVisible(!visible);
    }

    useImperativeHandle(refs, () => {
        return { handleVisibility };
    })

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={handleVisibility}>{props.btnLable}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={handleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    btnLable: PropTypes.string.isRequired,
}

export default Togglable;