import React from 'react';
import ScholarItem from './ScholarItem';

function ScholarList({ data, onDelete }) {
  return (
    <div className="list-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Scholarship Name</th>
            <th>Sponsor</th>
            <th>Value</th>
            <th>Email</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {data.map((scholar, index) => (
            <ScholarItem
              key={scholar.id}
              stt={index + 1}
              item={scholar}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScholarList;
