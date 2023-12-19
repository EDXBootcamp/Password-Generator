// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options

function getPasswordOptions() {
  const result = Swal.fire({
    title: 'Password Options',
    html:
      '<input type="number" id="length" class="swal2-input" placeholder="Length (8-128)" min="8" max="128">' +
      '<br><br>' +
      '<label><input type="checkbox" id="includeLower"> Include Lowercase</label><br>' +
      '<label><input type="checkbox" id="includeUpper"> Include Uppercase</label><br>' +
      '<label><input type="checkbox" id="includeNumeric"> Include Numeric</label><br>' +
      '<label><input type="checkbox" id="includeSpecial"> Include Special Characters</label>',
    focusConfirm: false,
    preConfirm: () => {
      var options = {
        length: parseInt(document.getElementById('length').value, 10),
        includeLower: document.getElementById('includeLower').checked,
        includeUpper: document.getElementById('includeUpper').checked,
        includeNumeric: document.getElementById('includeNumeric').checked,
        includeSpecial: document.getElementById('includeSpecial').checked,
      };

      if(options.length<8 || options.length >128){
        alert('Length Should be 8-128.');
        return false;
      }

      // Validate that at least one character type is selected
      if (!options.includeLower && !options.includeUpper && !options.includeNumeric && !options.includeSpecial) {
        alert('At least one character type must be selected.');
        return false;
      }

      return options;
    },
    showCancelButton: true,
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      return result.value;
    } else {
      // Handle cancel or close actions
      return null;
    }
  });

  // console.log("result")
  // console.log(result)
  return result;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
async function generatePassword() {
  var options = await getPasswordOptions();
  if (!options) return;

  var allCharacters = [];
  var result = '';

  if (options.includeLower) {
    allCharacters = allCharacters.concat(lowerCasedCharacters);
  }

  if (options.includeUpper) {
    allCharacters = allCharacters.concat(upperCasedCharacters);
  }

  if (options.includeNumeric) {
    allCharacters = allCharacters.concat(numericCharacters);
  }

  if (options.includeSpecial) {
    allCharacters = allCharacters.concat(specialCharacters);
  }

  for (var i = 0; i < options.length; i++) {
    result += getRandom(allCharacters);
  }

  return result;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
async function writePassword() {
  var password = await generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

