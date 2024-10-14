// Function to retrieve entries from localStorage
const retrieveEntries = () => {
    const entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
  };
  
  // Display entries in a table
  const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>*****</td>`; // Mask password
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const termsCell = `<td class='border px-4 py-2'>${entry.terms ? 'Yes' : 'No'}</td>`;
  
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${termsCell}</tr>`;
      return row;
    }).join("\n");
  
    const table = `<table class="table-auto w-full"><tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">DOB</th>
      <th class="px-4 py-2">Accepted Terms</th>
    </tr>${tableEntries}</table>`;
  
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
  };
  
  // Function to hash the password (basic example, consider using a stronger hashing algorithm)
  const hashPassword = (password) => {
    return btoa(password); // Use base64 as a placeholder. Replace with stronger hash in production.
  };
  
  // Save user form data and display entries
  const saveUserForm = (event) => {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = hashPassword(document.getElementById("password").value);
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;
  
    const entry = {
      name,
      email,
      password, // Now hashed
      dob,
      terms,
    };
  
    // Retrieve existing entries
    let userEntries = retrieveEntries();
    
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    
    userForm.reset(); // Clear the form fields
  };
  
  // Ensure user form event listener is added
  const userForm = document.getElementById("user-form");
  userForm.addEventListener("submit", saveUserForm);
  
  // Display the entries on page load
  displayEntries();  