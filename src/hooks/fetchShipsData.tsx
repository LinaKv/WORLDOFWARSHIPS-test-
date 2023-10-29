import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse } from '../shared/types';
import { Vehicle } from '../shared/types';

const useGetShipsData = () => {
    const [data, setData] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const apiUrl = 'https://vortex.korabli.su/api/graphql/glossary/';

    // query with data which are needed
    const graphqlQuery = `query {
    vehicles {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
          title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`;

    const requestOptions = {
        method: 'POST',
        url: apiUrl,
        data: { query: graphqlQuery },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(requestOptions);

                console.log(response.data.data.vehicles);

                setData(response.data.data.vehicles);
            } catch (err) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return data;
};

export default useGetShipsData;
