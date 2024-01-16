import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ClassTable } from './components/ClassTable/ClassTable';
import { fetchClassData } from './redux/slices/class/actions';
import { loadingSelector } from './redux/slices/class/selectors';
import { errorSelector } from './redux/slices/ui/uiReducer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  
  useEffect(() => {
    const getStudentsData = async () => {
      dispatch(fetchClassData(2) as any);
    }

    getStudentsData();
  }, [dispatch]);

  return (
    <div>
      <h1>Class table</h1>
      {error && <ErrorMessage error={error} />}
      {!loading && <ClassTable />}
    </div>
  )
}

export default App;
