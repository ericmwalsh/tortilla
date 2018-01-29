import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import "./sortable_table.css";

class SortableTable extends Component {
  fiatRow = (row, precision) => {
    return <span>${parseFloat(row.value).toFixed(precision)}</span>;
  };

  percentageRow = row => (
    <span>
      <span
        style={{
          color:
            row.value <= 0
              ? "#ff2e00" // red
              : row.value === 0
                ? "#ffbf00" // yellow
                : "#57d500", // green
          transition: "all .3s ease",
        }}
      >
        &#x25cf;
      </span>{" "}
      {`${row.value}%`}
    </span>
  );

  render() {
    const data = this.props.list;
    const columns = [
      {
        Header: "Symbol",
        accessor: "symbol",
        Cell: row => (
          <span>
            <b>{row.value}</b>
          </span>
        ),
      },
      {
        Header: "% Change (Hour)",
        accessor: "change_h",
        Cell: this.percentageRow,
      },
      {
        Header: "% Change (Day)",
        accessor: "change_d",
        Cell: this.percentageRow,
      },
      {
        Header: "% Change (Week)",
        accessor: "change_w",
        Cell: this.percentageRow,
      },
      {
        Header: "Value (USD)",
        accessor: "price",
        Cell: row => this.fiatRow(row, 5),
      },
      {
        Header: "Quantity",
        accessor: "amount",
      },
      {
        Header: "Total (USD)",
        accessor: "value",
        Cell: row => this.fiatRow(row, 2),
      },
    ];
    return (
      <div className="portfolio-table">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={20}
          className="-striped -highlight"
          defaultSorted={[
            {
              id: "value",
              desc: true,
            },
          ]}
        />
      </div>
    );
  }
}

export default SortableTable;
