const GoalForm = () => {
    return (
      <form className="create">
        <h3>Add a New Goal</h3>
  
        <label>Text:</label>
        <input type="text" className="" />
        <label>Due Date:</label>
        <input type="date" className="" />
        <label>Priority:</label>
        <input type="text" className="" />
        <button>Add Goal</button>
      </form>
    );
  };
  
  export default GoalForm;
  