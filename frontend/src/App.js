import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // For styling

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'Alphabets', label: 'Alphabets' },
        { value: 'Numbers', label: 'Numbers' },
        { value: 'Highest Lowercase Alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('http://localhost:3001/bfhl', jsonData); // Update to match your backend URL
            console.log(res.data);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON format or API call failed');
            console.log(err)
            setResponse(null);
        }
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        return (
            <div>
                {selectedOptions.some(option => option.value === 'Alphabets') && 
                    <div>Alphabets: {alphabets.join(', ')}</div>}
                {selectedOptions.some(option => option.value === 'Numbers') && 
                    <div>Numbers: {numbers.join(', ')}</div>}
                {selectedOptions.some(option => option.value === 'Highest Lowercase Alphabet') && 
                    <div>Highest Lowercase Alphabet: {highest_lowercase_alphabet}</div>}
            </div>
        );
    };

    return (
        <div className="App">
            <div className="input-section">
                <label>API Input</label>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder='Enter JSON input, e.g., {"data": ["A","C","z"]}'
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            {error && <div className="error">{error}</div>}
            {response && (
                <div className="filter-section">
                    <label>Multi Filter</label>
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                        value={selectedOptions}
                    />
                </div>
            )}
            {renderResponse() && (
                <div className="response-section">
                    <h3>Filtered Response</h3>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
};

export default App;
