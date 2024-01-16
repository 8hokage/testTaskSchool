import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import styles from './styles.module.css';
import { setUnRate } from "../../api/setUnRate";
import { setRate } from "../../api/setRate";
import { setUnRateImmidiate, setRateImmidiate } from "../../redux/slices/class/classReducer";
import { schoolboysSelector, lessonSelector } from "../../redux/slices/class/selectors";
import { showError } from "../../redux/slices/ui/uiReducer";

export const ClassTable = () => {
  const dispatch = useDispatch();

  const schoolboys = useSelector(schoolboysSelector);
  const lessons = useSelector(lessonSelector);

  const schoolboysForTable = Object.values(schoolboys).sort((x, y) => {
    return x.fullName.localeCompare(y.fullName);
  });
  const lessonsForTable =  Object.values(lessons).sort((x, y) => {
    return x.Title.split('/')[0].localeCompare(y.Title.split('/')[0]);
  })

  const rate = (rate: string, schoolboyIndex: number, lessonId: string) => {
    return () => {
      const schoolboyId = schoolboysForTable[schoolboyIndex].id;
      if (rate) {
          dispatch(setUnRateImmidiate({
          schoolboyId: schoolboyId,
          lessonTitle: lessons[lessonId].Title,
        }));

        setUnRate(2, schoolboyId, lessonId).catch(() => {
          dispatch(showError('Failed to unrate'))
          dispatch(setRateImmidiate({
            schoolboyId: schoolboyId,
            lessonTitle: lessons[lessonId].Title,
          }));
        });
      } else {
        dispatch(setRateImmidiate({
          schoolboyId: schoolboyId,
          lessonTitle: lessons[lessonId].Title,
        }));

        setRate(2, schoolboyId, lessonId).catch((e) => {
          dispatch(showError('Failed to rate'))
          dispatch(setUnRateImmidiate({
            schoolboyId: schoolboyId,
            lessonTitle: lessons[lessonId].Title,
          }));
        });
      }
    }
  }

  const columns = [
    {Header: 'No', accessor: 'order', Cell: ({row}: {row: {index: number}}) => <div>{row.index + 1}</div>},
    {Header: 'Name', accessor: 'fullName'},
    ...lessonsForTable.map((item: any) => ({
      Header: item.Title,
      accessor: item.Title, 
      Cell: ({row}: {row:{original: Record<string, string>, index: number}}) => (
        <div 
          className={styles.cellContent} 
          onClick={rate(row.original[item.Title], row.index, item.Id)}>
            {row.original[item.Title]}
          </div>) 
    })),
  ]
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    autoResetHiddenColumns: false,
    columns: columns,
    data: schoolboysForTable,
  });
  

  return (
    <div className={styles.tableWrapper}>
    <TableContainer className={styles.tableContainer} component={Paper}>
    <Table {...getTableProps()} className={styles.table}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow className={styles.header} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell className={styles.cell} {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
              return (
                <TableRow className={styles.row} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell className={styles.cell} {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  )
}