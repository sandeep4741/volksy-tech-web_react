import React from 'react';
import Proptypes, { number } from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow({ isHeader,id, textFirstCell, textSecondCell }) {
const [checkboxCheck, setCheckboxCheck] = React.useState(false);

  let trContent = '';
  const checkToggle = () => setCheckboxCheck(!checkboxCheck);
  const styleBodyRow = { backgroundColor: '#deb5b545' };
  const styleHeaderRow = { backgroundColor: '#f5f5f5ab' };



  if (isHeader) {
    if (textSecondCell === null) {
		trContent = (<th colSpan='2' className={css(style.thFirt, style.thTd)}>{textFirstCell}</th>);
    }
	else {
		trContent =
		  <>
			<th className={css(style.headerRow, style.defaultRow)} >{textFirstCell}</th>
			<th className={css(style.headerRow, style.defaultRow)}>{textSecondCell}</th>
		  </>;
	  }
	 }
else {
	trContent = <>
			<td>
			  <input type="checkbox" onClick={checkToggle} />
			  {textFirstCell}
			</td>
			<td>{textSecondCell}</td>
		  </>;;
	  }

	  let styleRow;
	  if (isHeader) {
		styleRow = styleHeaderRow;
	  } else {
		styleRow = styleBodyRow;
	  }
	  return (
		<tr key={id} className={css(checkboxCheck ? style.rowChecked : '')}  style={styleRow} >{trContent}</tr>
	  );
	}
const style = StyleSheet.create({
	thFirt: {
	  textAlign: 'center',
	},
	headerRow: {
		textAlign: 'center',
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
		borderBottomColor: 'gray'
	  },
	  defaultRow: {
		textAlign: 'left'
	  },
	rowChecked: {
		backgroundColor: '#e6e4e4'
	  },

	thTd: {
	  padding: '0.25rem',
	  border: '1px solid lightgray',
	}
  });

  CourseListRow.propTypes = {
	id: number,
	isHeader: Proptypes.bool,
	textFirstCell: Proptypes.string.isRequired,
	textSecondCell: Proptypes.oneOfType([Proptypes.string,Proptypes.number
	]),
  };

CourseListRow.defaultProps = {
  textFirstCell: "",
  isHeader: false,
  textSecondCell: null
};

