import PropTypes from "prop-types";
import "./QuestionSorting.scss";

const QuestionSorting = ({ onSortChange, onFilterChange }) => {
  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    onSortChange(sortOption);
  };

  const handleFilterChange = (e) => {
    const filterOption = e.target.value;
    onFilterChange(filterOption);
  };

  return (
    <div>
      <form >
        <select className="sortingSection" id="questions" name="questions" onChange={handleSortChange}>
          <option value="">Select sorting option</option>
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
        <select className="sortingSection"  id="filter" name="filter" onChange={handleFilterChange}>
          <option value="">Select filter option</option>
          <option value="showAll">Show all</option>
          <option value="withAnswers">Only with answers</option>
          <option value="withoutAnswers">Only without answers</option>
        </select>
      </form>
    </div>
  );
};

QuestionSorting.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default QuestionSorting;
