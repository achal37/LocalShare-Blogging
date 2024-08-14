import React, { useEffect, useState } from 'react';

function Location() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='bg-white font-medium h-10 items-center justify-center border-2 border-sblue p-2 rounded-lg inline-block whitespace-nowrap'>
      {user.location}
    </div>
  );
}

export default Location;
