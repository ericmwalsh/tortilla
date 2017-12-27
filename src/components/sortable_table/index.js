import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import './sortable_table.css';

class SortableTable extends Component {

  render() {
    const data = this.props.list
    const columns = [
      {
        Header: "Symbol",
        accessor: "symbol"
      },
      {
        Header: "% Change (Hour)",
        accessor: "change_h"
      },
      {
        Header: "% Change (Day)",
        accessor: "change_d"
      },
      {
        Header: "% Change (Week)",
        accessor: "change_w"
      },
      {
        Header: "Value (USD)",
        accessor: "price"
      },
      {
        Header: "Quantity",
        accessor: "amount"
      },
      {
        Header: "Total (USD)",
        accessor: "value"
      }
    ]
    return (
      <div className="portfolio-table">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={25}
          className="-striped -highlight"
          defaultSorted={[
            {
              id: "value",
              desc: true
            }
          ]}
        />
      </div>
    );
  }
}

export default SortableTable;
