"use client";
import { useState } from 'react';

const SubcriptionForm = () =>  {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission or perform other actions with inputValue
        console.log('Input value:', inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='rounded-none'
                type="email"
                value={inputValue}
                placeholder="example@gamil.com"
                onChange={handleInputChange}
            />
            <button className="inline-block w-44 h-12 text-white bg-primary text-center leading-[48px]" type="submit">Submit</button>
        </form>
    );
}

export default SubcriptionForm;
