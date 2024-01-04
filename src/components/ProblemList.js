import React, { useState } from 'react';
import backtracking from '@site/static/data/backtracking.json';
import binarySearch from '@site/static/data/binary_search.json';
import greedy from '@site/static/data/greedy.json';
import permutationAndCombination from '@site/static/data/permutation_and_combination.json';
import prefixArray from '@site/static/data/prefix_array.json';

const ProblemList = () => {
  const allData = [backtracking, binarySearch, greedy, permutationAndCombination, prefixArray];

	const totalCount = allData.reduce((total, data) => total + data.length, 0);

  // Merge all JSON data into a single array
  const mergedData = allData.reduce((acc, data) => [...acc, ...data], []);

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Sort the merged data based on the provided key and direction
  const sortedData = mergedData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const onSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const renderTableHeader = () => {
    if (sortedData.length === 0) return null;

    const header = Object.keys(sortedData[0]).filter((key) => key !== 'link'); // Exclude 'link' column
			return (
				<thead>
					<tr>
						{header.map((key) => (
							<th key={key} onClick={() => onSort(key)} style={{ cursor: 'pointer' }}>
								{key === 'id' ? '#' : key.charAt(0).toUpperCase() + key.slice(1)}
								{sortConfig.key === key && (
									<span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
								)}
							</th>
						))}
					</tr>
				</thead>
			);
		};

		const renderTableData = () => {
			return (
				<tbody>
					{sortedData.map((item, index) => (
						<tr key={index}>
							{Object.entries(item).map(([key, value]) => (
								key !== 'link' && (
									<td key={key}>
										{key === 'name' ? (
											<span className="problem-name">
												{item.name}
											</span>
										) : key === 'tags' ? (
											<span className="oval-tag">
												{value[0].replace(/-/g, ' ')}
											</span>
										) : (
											<span className="problem-name">
												{value}
											</span>
										)}
									</td>
								)
							))}
						</tr>
					))}
				</tbody>
			);
		};				

  return (
    <div>
      <h2>Leetcode Problems</h2>
      <table>
        {renderTableHeader()}
        {renderTableData()}
      </table>
			<b>Total Solved: {totalCount} </b>
    </div>
  );
};

export default ProblemList;
