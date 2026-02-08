/**
 * app.ts
 *
 * This script provides the core logic for the multiplication web application.
 * It handles user input from two number fields, performs multiplication,
 * and displays the result or an error message.
 *
 * Best Practices:
 * - Type Safety: Uses TypeScript to ensure correct variable types.
 * - DOM Manipulation: Safely accesses DOM elements using non-null assertions (!)
 *   after checking for their existence.
 * - Event Listeners: Attaches an event listener to the calculate button.
 * - Input Validation: Checks if inputs are valid numbers before calculation.
 * - Error Handling: Displays user-friendly error messages for invalid input.
 * - Readability: Uses clear variable names and comments.
 */

// --- DOM Element References ---
// We use type assertions to tell TypeScript the exact type of the elements,
// and non-null assertions (!) because we are confident these elements exist
// in our index.html.
const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = document.getElementById('num2') as HTMLInputElement;
const calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
const resultSpan = document.querySelector('.result-value') as HTMLSpanElement;
const errorMessageDiv = document.getElementById('error-message') as HTMLParagraphElement;

/**
 * Validates if a string can be parsed into a finite number.
 * @param value The string value from an input field.
 * @returns True if the value is a valid finite number, false otherwise.
 */
function isValidNumber(value: string): boolean {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
}

/**
 * Performs the multiplication calculation and updates the UI.
 * Handles parsing input, validating, calculating, and displaying results/errors.
 */
function calculateMultiplication(): void {
    // Clear previous error messages
    errorMessageDiv.textContent = '';
    resultSpan.textContent = '0'; // Reset result

    // Get input values
    const num1Str = num1Input.value.trim();
    const num2Str = num2Input.value.trim();

    // --- Input Validation ---
    if (!isValidNumber(num1Str) || !isValidNumber(num2Str)) {
        errorMessageDiv.textContent = 'Please enter valid numbers in both fields.';
        return; // Stop execution if validation fails
    }

    // Convert string inputs to numbers
    const num1 = parseFloat(num1Str);
    const num2 = parseFloat(num2Str);

    try {
        // Perform multiplication
        const result = num1 * num2;

        // Display the result, rounded to a reasonable precision if it's a float
        // to avoid floating-point inaccuracies in display for simple cases.
        // For production-grade financial calculations, specialized libraries would be used.
        resultSpan.textContent = result.toFixed(2).replace(/\.00$/, ''); // Remove .00 for whole numbers
    } catch (error) {
        // This catch block is mostly for defensive programming, as simple multiplication
        // rarely throws synchronous errors.
        console.error("An unexpected error occurred during calculation:", error);
        errorMessageDiv.textContent = 'An unexpected error occurred. Please try again.';
    }
}

// --- Event Listener ---
// Attach the calculateMultiplication function to the button's click event.
calculateBtn.addEventListener('click', calculateMultiplication);

// Optional: Add event listeners for 'keyup' on input fields to allow
// calculation on 'Enter' key press for better user experience.
num1Input.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        calculateMultiplication();
    }
});
num2Input.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        calculateMultiplication();
    }
});