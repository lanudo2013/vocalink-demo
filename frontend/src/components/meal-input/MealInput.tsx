import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { withTranslation, WithTranslation } from "react-i18next";
import { Container, Button, InputLabel, makeStyles } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import './MealInput.scss';
import * as yup from 'yup';

export interface MealInputProps {
    onChange: (value: string) => void;
    loading: boolean;
}

const useStyles = makeStyles(theme => ({
    errorLabel: {
        color: theme.palette.error.main
    },
}));

function MealInput(props: MealInputProps & WithTranslation) {
    const [food, setFood] = useState('');
    const [error, setError] = useState(null);
    const {t} = props;
    const classes = useStyles({});

    const schema: yup.Schema<{food: string}> = yup.object().shape({
        food: yup.string().required().min(3)
    });

    const validate = (foodStr: string): Promise<any> => {
        return schema.validate({
            food: foodStr
        }).then(() => {
            setError(null);
            return true;
        }).catch((err: yup.ValidationError) => {
            if (err.type === 'required') {
                setError(t('app.mealinput.error.required'));
            } else if (err.type === 'min') {
                setError(t('app.mealinput.error.min'));
            }
            throw err;
        });
    };

    const handleChange = (event: React.ChangeEvent) => {
        const foodStr: string = (event.target as any).value;
        setFood(foodStr);
        validate(foodStr).catch(() => {});
    };

    const updateFood = () => {
        validate(food).then(x => {
            props.onChange(food);
            setFood('');
        }).catch(() => {});
    };

    const keyPressed = (ev: React.KeyboardEvent) => {
        if (ev.key === 'Enter') {
            updateFood();
        }
    };

    return <Container className="container">
        <form noValidate autoComplete="off" className="form" onSubmit={(ev: React.FormEvent) => ev.preventDefault()}>
            <div className="meal-input">
                <div className="meal-input-info">
                    <TextField
                        id="meal-field"
                        label={t('app.mealinput.label')}
                        className="input"
                        value={food}
                        error={error !== null}
                        onKeyPress={keyPressed}
                        onChange={(ev: React.ChangeEvent) => handleChange(ev)}
                        margin="normal"
                        variant="outlined"
                    />
                    {error ? <InputLabel className={classes.errorLabel + ' error-label'}>{error}</InputLabel> : null}
                </div>
                <Button variant="contained" color="secondary" disabled={error !== null || props.loading} onClick={updateFood} id="search">
                    {t('app.mealinput.search')}
                    <Icon className="icon">search</Icon>
                </Button>
            </div>
        </form>
    </Container>;
}
export default withTranslation()(MealInput);
