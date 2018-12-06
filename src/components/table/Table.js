import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Index </CustomTableCell>
            <CustomTableCell>Dessert </CustomTableCell>
            <CustomTableCell >Calories</CustomTableCell>
            <CustomTableCell >Fat</CustomTableCell>
            <CustomTableCell >Carbs</CustomTableCell>
            <CustomTableCell >Protein</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((value,index) => {
            return (
              <TableRow className={classes.row} key={value.MemberID}>
                <CustomTableCell >{index+1}</CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {value.MemberID}
                </CustomTableCell>
                <CustomTableCell >{value.EToday}</CustomTableCell>
                <CustomTableCell >{value.ETotal}</CustomTableCell>
                <CustomTableCell >{value.Kwp}</CustomTableCell>
                <CustomTableCell >{value.Today_income}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);