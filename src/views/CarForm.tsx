function CarForm() {
  return (
    <form>
      <select name="brand" id="brand">
        <option value="audi">Audi</option>
        <option value="bmw">BMW</option>
        <option value="mercedes">Mercedes</option>
      </select>

      <select name="model" id="model">
        <option value="a4">A4</option>
        <option value="a6">A6</option>
        <option value="a8">A8</option>
      </select>

      <button>Submit</button>
    </form>
  );
}

export default CarForm;
