import * as React from "react"

import { filter, flatten, groupBy, sortBy } from "lodash"
import countBy from "lodash/countBy"
import orderBy from "lodash/orderBy"
import PropTypes from "prop-types"
import { compose, withProps } from "recompose"
import styled, { css } from "styled-components/macro"

import { ALL_REGULATOR_CHECKS } from "src/apps/Regulatory/RegulatorChecks/RegulatorConstants"
import { AllRecordsTable } from "src/apps/Regulatory/Section29aChecks/AllRecordsTable"
import RegulatorActivityRecord from "src/apps/Regulatory/Section29aChecks/RegulatorActivityRecord/RegulatorActivityRecord.js"
import Section29aCheckDetail from "src/apps/Regulatory/Section29aChecks/Section29aCheckDetail"
import { withReport } from "src/apps/context"

import { relationMapping } from "src/commons/components/Constants/relationMapping.js"
// import RegulatorCheckDetail from "./RegulatorCheckDetail"
import {
  NonScrollableDialog,
  ScrollableDialog,
} from "src/commons/components/DialogBox/DialogBox.js"
import SectionHeader from "src/commons/components/SectionHeader/SectionHeader"
import { DataTable } from "src/commons/components/SmartTable/DataTable"
import {
  Entity as EntityPropTypes,
  RegulatorCheck as RegulatorCheckPropTypes,
  RegulatorItem,
} from "src/commons/types/base_types"

import { Badge, Grid, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { Done, Flag, Info } from "@material-ui/icons"

import CardHeader from "../../../commons/components/CardHeader/CardHeader"
import SmartTable from "../../../commons/components/SmartTable/SmartTable"
import { SummaryTagsHeaderBlock } from "../../../commons/components/SummaryTagsBlock/SummaryTagsBlock"
import styles from "./style.module.scss"

export const CHECK_STATUS = {
  SUCCESS: {
    label: "SUCCESS",
    color: "green",
    Component: Done,
  },
  INFO: {
    label: "INFO",
    color: "#888",
    Component: Info,
  },
  WARNING: {
    label: "WARNING",
    color: "orange",
    Component: Flag,
  },
  CRITICAL: {
    label: "CRITICAL",
    color: "red",
    Component: Flag,
  },
}

export const recordType_mapping = {
  litigation: "Litigation",
  sebi_record: "SEBI Records",
  mca_company_defaulter_record: "MCA Defaulter Records",
  cci_record: "CCI Records",
  cibil_record: "CIBIL Records",
  sebi_debarred_record: "SEBI Debarred Records",
  watchlist: "Regulator Check List Records",
  epf_defaulter_record: "EPD Defaulter Records",
  financial_intelligence_unit_record: "FIU Records",
  rbi_compounding_order_record: "RBI Compounding Orders",
  mca_vanishing_company_record: "MCAA Vanishing Company Records",
  mca_director_defaulter_record: "MCA Director Defaulter Records",
  cbi_notice_record: "CBI Notice Record",
  un_consolidated_record: "UN Consolidated Record",

  sebi_unserved_summons_notices_check: "SEBI Unserved Summons Notices Check",
  member_state_assembly_check: "Member State Assembly Check",
  member_loksabha_check:"Member Loksabha Check",
  member_rajyasabha_check: "Member Rajyasabha Check"

}

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiTableRow: {
        root: {
          cursor: "pointer",
        },
      },
    },
  })

export class RegulatorChecks extends React.Component<Props, State> {
  state = {
    activeItem: null,
    activeRecord: null,
    //showAllDetails: this.props.hideshowAllButton ? this.props.hideshowAllButton : false,
  }
  toggleDialog(dialogId: string) {
    this.setState({
      activeDialog: this.state.activeDialog === dialogId ? null : dialogId,
    })
  }
  handleCloseDialog = () => {
    this.setState({ activeItem: null })
  }

  onRecordsButtonClick = (record) => () => {
    this.setState({
      activeRecord: record,
    })
  }

  onRecordsButtonClickItem = (index) => {
    this.setState({
      activeItem: index,
    })
  }

  handleCloseRecordDialog = () => {
    this.setState({ activeRecord: null })
  }

  // handleShowAllDetails = () => {
  //   this.setState({ showAllDetails: !this.state.showAllDetails })
  // }
  render() {
    const {
      checks,
      targetType,
      target,
      categoryType,
      hideshowAllButton,
      relation,
      records,
    } = this.props
    const updatedChecks = []
    checks.forEach((check) => {
      let tooltip = ""
      Object.keys(groupBy(check.records, "type")).forEach(
        (element) =>
          (tooltip += `${recordType_mapping[element]}: ${
            groupBy(check.records, "type")[element].length
          }\n`)
      )
      updatedChecks.push({
        ...check,
        Records: `Status: ${check.status} \nTotal ${check.records.length} records found\n${tooltip}`,
      })
    })

    const regulatoryActivityColumns = [
      {
        name: "name",
        label: "Checks",
        options: {
          customBodyRenderLite: (dataIndex) => {
            const data = checks[dataIndex].name
            return (
              <p style={{ fontWeight: 500, fontSize: "11px" }}>
                {ALL_REGULATOR_CHECKS[data] ? ALL_REGULATOR_CHECKS[data].label : data}
              </p>
            )
          },
        },
      },
      {
        name: "instituteName",
        label: "Institute",
      },
      {
        name: "status",
        label: "Status",
        options: {
          customBodyRenderLite: (dataIndex) => {
            const data = checks[dataIndex].status
            const Component = CHECK_STATUS[data] && CHECK_STATUS[data].Component
            const color = CHECK_STATUS[data].color
            return (
              <div style={{ display: "flex", color: color, fontWeight: "500" }}>
                {Component ? (
                  <Component style={{ color: color, margin: "0 8px 0 0" }} />
                ) : null}
                {data}
              </div>
            )
          },
        },
      },
      // {
      //   name: 'Activity Type',
      //   label: 'Activity Type',
      //   options: {
      //     customBodyRender: (data, {rowIndex}, updatevalue) => {
      //       return <p>{data ? data.join(', ') : ''}</p>
      //     },
      //   },
      // },
      {
        name: "records",
        label: "Records",
        options: {
          filter: false,
          sort: false,
          download: false,
          customBodyRenderLite: (dataIndex) => {
            const data = checks[dataIndex].records
            const status = checks[dataIndex].status
            let tooltip = ""
            Object.keys(groupBy(data, "type")).forEach(
              (element) =>
                (tooltip += `${element}: ${groupBy(data, "type")[element].length}\n`)
            )
            return data && data.length ? (
              <div>
                <p color="inherit" variant="h6">
                  Status: {status}
                  <br />
                  Total records found: {data.length}
                </p>
                {Object.keys(groupBy(data, "type")).map((element, index) => (
                  <span key={index}>
                    {`${recordType_mapping[element]}: ${
                      groupBy(data, "type")[element].length
                    }\n`}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ padding: "0 16px", fontSize: "9px", color: "#666" }}>
                NO RECORDS
              </p>
            )
          },
        },
      },
      {
        name: "Records",
        label: "Records",
        options: {
          display: "excluded",
        },
      },
      {
        name: "description",
        label: "Description",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data, { rowIndex, rowData }, updatevalue) => {
            return ALL_REGULATOR_CHECKS[rowData[0]]
              ? ALL_REGULATOR_CHECKS[rowData[0]].description
              : "-"
          },
        },
      },
    ]

    return (
      <div>
        <Grid container spacing={3} style={{ padding: "24px 26px 0px" }}>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <p style={{ color: "#52585c", fontWeight: "500", fontSize: "11px" }}>
              {"Party Name:"}
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography
              style={{ color: "#153e52", fontWeight: "500", fontSize: "14px" }}
            >
              {target ? target.name : "NA"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ padding: "6px 26px" }}>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <p style={{ color: "#52585c", fontWeight: "500", fontSize: "11px" }}>
              {"Relation:"}
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography
              style={{ color: "#153e52", fontWeight: "500", fontSize: "14px" }}
            >
              {relation && relation.map((item) => relationMapping[item]).join(" --> ")}
            </Typography>
          </Grid>
        </Grid>
        <div>
          <MuiThemeProvider theme={getMuiTheme()}>
            <SmartTable
              suggestions={[
                {
                  title: "Institute",
                  columnId: "instituteName",
                  details: checks.map((item) => item.instituteName),
                  onClick: this.toggleDialog.bind(this, ""),
                },
                {
                  title: "Status",
                  columnId: "status",
                  details: checks.map((item) => item.status),
                  onClick: this.toggleDialog.bind(this, ""),
                },
              ]}
              columns={regulatoryActivityColumns}
              tableData={updatedChecks.map((item) =>
                regulatoryActivityColumns.map((column) => item[column.name])
              )}
              count={checks.length}
              countTitle={"Total Checks"}
              searchBar={false}
              options={{
                rowsPerPage: 100,
                downloadOptions: {
                  filename: categoryType
                    ? `${target.name}_${categoryType}_Regulator_Checks.csv`
                    : `${target.name}_Regulator_Checks.csv`,
                  separator: ",",
                },
                onRowClick: (rowData, rowMeta) => {
                  this.onRecordsButtonClickItem(rowMeta.dataIndex)
                },
              }}
            />
          </MuiThemeProvider>
          <AllRecordsTable
            checks={records}
            tableName={
              categoryType
                ? `${target.name}_${categoryType}_Regulator_Check_All_Hits.csv`
                : `${target.name}_Regulator_Check_All_Hits.csv`
            }
            onClick={this.onRecordsButtonClick}
            type={"REGULATOR"}
          />
        </div>
        {this.state.activeItem != null ? (
          <NonScrollableDialog
            open={true}
            onClose={this.handleCloseDialog}
            maxWidth={"xl"}
            fullWidth={true}
          >
            <Section29aCheckDetail
              check={checks[this.state.activeItem]}
              targetType={targetType}
              entity={target}
              records={records}
            />
          </NonScrollableDialog>
        ) : null}
        {this.state.activeRecord != null ? (
          <NonScrollableDialog
            open={true}
            onClose={this.handleCloseRecordDialog}
            maxWidth={"md"}
            fullWidth={true}
          >
            <RegulatorActivityRecord
              activityRecord={this.state.activeRecord}
              targetType={targetType}
              style={{ height: "100%", overflowY: "auto" }}
              entity={this.state.activeRecord.entity}
              matchCategory={this.state.activeRecord.match_category}
              matches={this.state.activeRecord.matches}
            />
          </NonScrollableDialog>
        ) : null}
      </div>
    )
  }
}

RegulatorChecks.propTypes = {
  targetType: PropTypes.string,
  target: EntityPropTypes,
  checks: PropTypes.arrayOf(RegulatorCheckPropTypes),
  categoryType: PropTypes.string,
  relation: PropTypes.array,
  records: PropTypes.arrayOf(RegulatorItem),
}

// function addProps(ownProps) {

// }
export default compose(
  withReport
  // withProps(addProps)
)(RegulatorChecks)
