function ShoppingList({ shoppingList, removeItem, remainingBudget }) {
    return (
      <>
        <h2>Remaining Budget: ${remainingBudget.toFixed(2)}</h2>
        {shoppingList.map((val, index) => (
          <div
            className={val.purchased ? 'card flex-apart green' : 'card flex-apart'}
            key={index}
          >
            <span>{val.name} - ${parseFloat(val.cost || 0).toFixed(2)}</span>
            <button className='btn' onClick={() => removeItem(index)}>x</button>
          </div>
        ))}
      </>
    );
  }
  
  export default ShoppingList;
  