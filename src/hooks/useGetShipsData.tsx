import { useState, useEffect } from 'react';
import axios from 'axios';
import { Vehicle } from '../shared/types';

const useGetShipsData = () => {
    const [data, setData] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
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
                setData(response.data.data.vehicles);
            } catch (err) {
                console.error('Error  ' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return [data, loading];
};

export default useGetShipsData;
