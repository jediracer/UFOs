// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        });
    });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters. 
function updateFilters(element_id ) {

    // 4a. Save the element that was changed as a variable.

    let filterName = "#" + element_id;

    // 4b. Save the value that was changed as a variable.
    let filterValue = d3.select(filterName).property("value");
    
    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = element_id;

    // 5. If a filter value was entered then add that filterId and value
    // to the filters object. Otherwise, clear that filter from the filters object.
    filters[filterId] = filterValue;
    if (filters[filterId] === "") {
        delete filters[filterId];
    };
    
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
    
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (dataFilter in filters){
        let filterName = dataFilter;
        let value = filters[dataFilter];
        filteredData = filteredData.filter(row => row[filterName] === value);
    };
    
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
document.querySelectorAll(".list-group-item").forEach(item =>{
    item.addEventListener('change',event => {
        element_id = item.getElementsByTagName("input")[0].id
        updateFilters(element_id)
    }) 
})

// Build the table when the page loads
buildTable(tableData);
