import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function UserForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        full_name: '',
        selectedRoles: []
    });
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');

    const options = roles.map(role => ({
        value: role.id,
        label: role.name
    }));

    const selectedRolesValues = data.selectedRoles.map(roleId => ({
        value: roleId,
        label: roles.find(role => role.id === roleId)?.name
    }));

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('/api/roles');
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
    
        fetchRoles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, options } = e.target;

        if (name === "selectedRoles") {
            const selectedValues = Array.from(options)
                                  .filter(option => option.selected)
                                  .map(option => option.value);
            setData(prevState => ({
                ...prevState,
                [name]: selectedValues
            }));
        } else {
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                ...data,
                roles: data.selectedRoles
            };
            console.log(userData);
    
            const response = await axios.post('/api/save-users', userData);
            setMessage('User created successfully!');
            navigate('/users');
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Failed to create user.');
        }
    }

    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [focusedInput, setFocusedInput] = useState('');

    // ...

    return (
        <>
            <div style={styles.container}>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={styles.label}>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={data.email}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput('')}
                            style={
                                focusedInput === 'email'
                                    ? {...styles.input, ...styles.inputFocus}
                                    : styles.input
                            }
                            required 
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Full Name:</label>
                        <input 
                            type="text" 
                            name="full_name"
                            value={data.full_name}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedInput('full_name')}
                            onBlur={() => setFocusedInput('')}
                            style={
                                focusedInput === 'full_name'
                                    ? {...styles.input, ...styles.inputFocus}
                                    : styles.input
                            }
                            required 
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <label style={styles.label}>Roles:</label>
                        <Select 
                            isMulti
                            name="selectedRoles"
                            options={options}
                            value={selectedRolesValues}
                            onChange={(selected) => {
                                const selectedValues = selected.map(option => option.value);
                                setData(prevState => ({
                                    ...prevState,
                                    selectedRoles: selectedValues
                                }));
                            }}
                            style={
                                focusedInput === 'full_name'
                                    ? {...styles.input, ...styles.inputFocus}
                                    : styles.input
                            }
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={isButtonHovered ? {...styles.button, ...styles.buttonHover} : styles.button}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div style={{textAlign: 'center', color: 'blue', cursor: 'pointer', marginLeft: '300px', marginTop: '-30px', fontWeight: 'bolder'}}><a onClick={() => navigate('/users')}>List all users <span style={{marginTop: '10px'}}>→</span></a></div>
        </>
    );
  
}

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        width: '80%',
        maxWidth: '400px',
        margin: '40px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '600'
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'border 0.2s'
    },
    select: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'border 0.2s'
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    inputFocus: {
        border: '1px solid #007BFF',
        boxShadow: '0 0 3px #aac8ff'
    }
};

export default UserForm;
