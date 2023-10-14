import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box } from '@material-ui/core';
import { isEmpty } from 'lodash';

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        console.log('hello');
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const groupedUsers = users.reduce((acc, user) => {
        user.roles.forEach(role => {
            if (!acc[role.name]) {
                acc[role.name] = [];
            }
            acc[role.name].push(user);
        });
        return acc;
    }, {});

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.header}>User List</h2>
                <button 
                    style={isButtonHovered ? {...styles.createButton, ...styles.createButtonHover} : styles.createButton}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    onClick={() => navigate('/')}
                >
                    Create New User
                </button>
            </div>

            <Tabs value={tabValue} onChange={handleTabChange}>
                {Object.keys(groupedUsers).map((roleName, index) => (
                    <Tab key={roleName} label={roleName} id={`tab-${index}`} />
                ))}
            </Tabs>

            {Object.keys(groupedUsers).map((roleName, index) => (
                <TabPanel value={tabValue} index={index} key={roleName}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedUsers[roleName].map(user => (
                                <tr key={user.id}>
                                    <td style={styles.td}>{user.email}</td>
                                    <td style={styles.td}>{user.full_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabPanel>
            ))}
        </div>
    );
    
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    createButtonHover: {
        backgroundColor: '#0056b3',
    },
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '40px auto',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    header: {
        marginBottom: '20px',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    th: {
        padding: '10px 20px',
        borderBottom: '2px solid #007BFF',
        backgroundColor: '#f1f1f1',
        color: '#007BFF',
        textTransform: 'uppercase',
        fontSize: '14px'
    },
    td: {
        padding: '10px 20px',
        borderBottom: '1px solid #eee',
        borderLeft: '1px solid #eee',
        fontSize: '14px'
    },
    role: {
        background: '#007BFF',
        color: '#fff',
        borderRadius: '15px',
        padding: '2px 10px',
        marginRight: '5px',
        display: 'inline-block'
    }
};


export default UserList;
