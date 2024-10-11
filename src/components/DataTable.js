import React, { useState } from 'react';

const DataTable = ({ data, notag }) => {
  const [sortOrder, setSortOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
  const [sortBy, setSortBy] = useState('id'); // Sorting criteria: 'id' or 'name'
  const [sortedData, setSortedData] = useState(data);

  // Function to convert string to URL slug
  const convertToSlug = (str) => {
    return str
      .toLowerCase()                
      .trim()                        
      .replace(/[\s\W-]+/g, '-') 
      .replace(/^-+|-+$/g, '');
  };

  // Handle sorting by either ID or Name
  const handleSort = (criteria) => {
    const newSortOrder = sortBy === criteria ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(criteria);
    setSortOrder(newSortOrder);

    const sorted = [...data].sort((a, b) => {
      if (criteria === 'id') {
        return newSortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (criteria === 'name') {
        return newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
			else if (criteria === 'tag') {
        return newSortOrder === 'asc' ? a.tag.localeCompare(b.tag) : b.tag.localeCompare(a.tag);
      }
      return 0;
    });

    setSortedData(sorted);
  };

	const totalSolved = sortedData.length;

  return (
    <div className='problemset-container'>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
              # {sortBy === 'id' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Solution {sortBy === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
						{!notag && (
              <th onClick={() => handleSort('tag')} style={{ cursor: 'pointer' }}>
                Tag {sortBy === 'tag' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <a href={`/leetcode/${convertToSlug(item.name)}`}>
                  {item.name}
                </a>
              </td>
							{!notag && (
                <td>
                  <a href={`../data-structures-and-algorithms/${convertToSlug(item.tag)}`}>
                    {item.tag}
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
			<b>Total Solved:</b> {totalSolved}
    </div>
  );
};

export default DataTable;
