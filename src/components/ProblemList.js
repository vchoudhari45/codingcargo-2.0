import React, { useState } from 'react';
import backtracking from '@site/static/data/backtracking.json';
import binarySearch from '@site/static/data/binary_search.json';
import greedy from '@site/static/data/greedy.json';
import permutations from '@site/static/data/permutations.json';
import combinations from '@site/static/data/combinations.json';
import prefixArray from '@site/static/data/prefix_array.json';
import dynamicProgramming from '@site/static/data/dynamic_programming.json';
import slidingWindow from '@site/static/data/sliding_window.json';
import deque from '@site/static/data/deque.json';

const ProblemList = () => {
  const allData = [backtracking, binarySearch, greedy, permutations, combinations, prefixArray, dynamicProgramming, slidingWindow, deque];
  const mergedData = allData.reduce((acc, data) => [...acc, ...data], []);

  const [sortConfig, setSortConfig] = useState({ 
    key: 'id', 
    direction: 'ascending' 
  });

  // Custom sorting function based on sortConfig
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

    const header = Object.keys(sortedData[0]).filter((key) => key !== 'link');

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
    const getHref = (firstTag, patternValue) => {
      const normalizedPattern = patternValue.replace(/ /g, '-').toLowerCase();
      if (firstTag && firstTag !== patternValue.toLowerCase()) {
        return `${firstTag.replace(/ /g, '-')}/${normalizedPattern}`;
      } else {
        return normalizedPattern;
      }
    };

    return (
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {Object.entries(item).map(([key, value]) => (
              <td key={key}>
                {key === 'pattern' ? (
                  <span className="pattern-name">
                    <a href={getHref(item.tags[0], value)}>{value}</a>
                  </span>
                ) : key === 'name' ? (
                  <span className="problem-name">{item.name}</span>
                ) : key === 'tags' ? (
                  <span className="oval-tag">{value[0]}</span>
                ) : (
                  <span className="default-value">{value}</span>
                )}
              </td>
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
      <b>Total Solved: {mergedData.length}</b>
    </div>
  );
};

export default ProblemList;
