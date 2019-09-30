import { Typography, makeStyles, Button, Modal} from "@material-ui/core";
import { WithTranslation, withTranslation } from "react-i18next";
import React from 'react';
import './ErrorModal.scss';

interface ErrorModalProps {
    open: boolean;
    onClose: () => void;
    errorMessage: string;
}

const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
}));

function ErrorModal(props: ErrorModalProps & WithTranslation) {
    const {errorMessage, open, onClose, t} = props;
    const classes = useStyles({});
    return <Modal
        open={open}
        onClose={onClose}
        className="modal"
    >
        <div className={classes.paper + ' paper'}>
            <Typography variant="h3" component="h3" className="errorDesc">
                {'Error: ' + errorMessage}
            </Typography>
            <Button type="button" onClick={onClose} variant="contained">
                {t('app.error.close')}
            </Button>
        </div>
    </Modal>;
}
export default withTranslation()(ErrorModal);
