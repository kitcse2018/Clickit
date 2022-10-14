

    const SelectBox = () => {

        return (
          <form>
              <div className="input_area">

                  <select id="class">
                      <optgroup label="푸름관">
                          <option value="푸름1동">푸름1동</option>
                          <option value="푸름2동">푸름2동</option>
                          <option value="푸름3동">푸름3동</option>
                          <option value="푸름4동">푸름4동</option>
                      </optgroup>
                      <optgroup label="오름관">
                          <option value="오름1동">오름1동</option>
                          <option value="오름2동">오름2동</option>
                          <option value="오름3동">오름3동</option>
                      </optgroup>
                  </select>
              </div>
          </form>
        );
}
export default SelectBox;

