import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import ChartColors from './constants/colors'


class PortfolioTable extends Component {

  render() {
    const data = this.props.coins
    const columns = [
      {
        Header: "Symbol",
        accessor: "name"
      },
      {
        Header: "Quantity",
        accessor: "quantity"
      },
      {
        Header: "Total (USD)",
        accessor: "total"
      }
    ]
    return (
      <div className="PortfolioTable">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          defaultSorted={[
            {
              id: "total",
              desc: true
            }
          ]}
        />
      </div>
    );
  }
}

export default PortfolioTable;
