const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://21bcb0156.netlify.app/' // Replace with your frontend's URL
}));
app.use(bodyParser.json());

// Define constants
const full_name = "Pranjay Seksaria";
const dob = "09/09/2002";
const email = "Pranjayseksaria09@gmail.com";
const roll_number = "21BCB0156"; // Assuming roll_number is also a constant

// GET route at /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST route at /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid or missing data array" });
        }

        // Extracting numbers and alphabets from the input array
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        const lowercaseAlphabets = alphabets
            .filter(item => item.toLowerCase() === item) // Ensure only lowercase
            .map(item => item.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
            ? String.fromCharCode(Math.max(...lowercaseAlphabets.map(c => c.charCodeAt(0))))
            : null;

        // Generate user ID
        const user_id = `${full_name.split(' ').join('_')}_${dob.split('/').join('')}`;

        // Response object
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
