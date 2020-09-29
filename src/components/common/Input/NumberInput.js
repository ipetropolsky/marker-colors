import React from 'react';
import PropTypes from 'prop-types';

import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiFormControl from '@material-ui/core/FormControl';

import LargeInput from './LargeInput';
import MuiInputAdornment from '@material-ui/core/InputAdornment';
import MuiIconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const NumberInput = ({
    label,
    onChange,
    units,
    step,
    shiftStep,
    value,
    minValue,
    maxValue,
    valueProcessor,
    ...props
}) => {
    const parsedValue = valueProcessor(parseFloat(value));
    const onInputChange = ({ target: { value } }) => {
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            onChange(floatValue);
        }
    };
    const onDecrease = ({ shiftKey }) => {
        if (!isNaN(parsedValue)) {
            onChange(Math.max(parsedValue - (shiftKey ? shiftStep : step), minValue));
        }
    };
    const onIncrease = ({ shiftKey }) => {
        if (!isNaN(parsedValue)) {
            onChange(Math.min(parsedValue + (shiftKey ? shiftStep : step), maxValue));
        }
    };
    return (
        <MuiFormControl fullWidth>
            <MuiInputLabel>{label}</MuiInputLabel>
            <LargeInput
                {...props}
                value={valueProcessor(value)}
                onChange={onInputChange}
                startAdornment={
                    <MuiInputAdornment position="start">
                        <MuiIconButton
                            style={{ marginLeft: -15 }}
                            aria-label={`Уменьшить`}
                            onClick={onDecrease}
                            disabled={isNaN(parsedValue)}
                        >
                            <RemoveIcon />
                        </MuiIconButton>
                    </MuiInputAdornment>
                }
                endAdornment={
                    <MuiInputAdornment position="end">
                        <MuiIconButton
                            style={{ marginRight: -15 }}
                            aria-label={`Увеличить`}
                            onClick={onIncrease}
                            disabled={isNaN(parsedValue)}
                        >
                            <AddIcon />
                        </MuiIconButton>
                    </MuiInputAdornment>
                }
            />
        </MuiFormControl>
    );
};

NumberInput.defaultProps = {
    valueProcessor: (value) => value,
    minValue: 0,
    maxValue: Infinity,
};

NumberInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
};

export default NumberInput;
