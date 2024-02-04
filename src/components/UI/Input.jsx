import React, { memo } from 'react';

export const Input = memo(React.forwardRef((props, ref) => {
    return (
        <input
            ref={ref}
            {...props}
        />
    );
}));