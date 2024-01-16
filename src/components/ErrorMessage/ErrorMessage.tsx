import { FC } from "react"
import { useDispatch } from "react-redux";
import { closeError } from "../../redux/slices/ui/uiReducer";
import styles from './styles.module.css';

export interface IErrorMessageProps {
  error: string;
}

export const ErrorMessage: FC<IErrorMessageProps> = ({error}) => {
  const dispatch = useDispatch();

  const handleCloseError = () => {
    dispatch(closeError());
  }

  return <div className={styles.error}>
    {`Error occured: ${error}`}
    <span className={styles.closeBtn} onClick={handleCloseError}>Close</span>
  </div>
}