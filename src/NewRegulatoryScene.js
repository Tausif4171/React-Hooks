import React from "react"

import { filter } from "lodash"
import PropTypes from "prop-types"
import track from "react-tracking"
import { compose, withProps } from "recompose"

import {
  getAllRegulatorItems,
  getRegulatoryChecks,
} from "src/apps/Regulatory/regulatorSelectors.js"
import { withReport } from "src/apps/context"
import { getTargetType } from "src/apps/selectors"

import AnalysisBlock from "src/commons/components/AnalysisBlock/AnalysisBlock"
import CardHeader from "src/commons/components/CardHeader/CardHeader"
import ItemWrapper from "src/commons/components/ItemWrapper/ItemWrapper"
import { TrackIfVisible } from "src/commons/components/Tracker.js"
import {
  Entity as EntityPropTypes,
  RegulatorCheck as RegulatorCheckPropTypes,
} from "src/commons/types/base_types"

import { Paper } from "@material-ui/core"

import { RegulatorChecks } from "./RegulatorChecks/RegulatorChecks"

const trackingOptions = {
  minDuration: 5000,
  root: "#containerElement",
  rootMargin: "-15% 0% -15%",
}

export const REGULATOR_CHECKS_SECTIONS = [
  {
    name: "accountingPayrollSecretarial",
    label: "Accounting, Payroll and Secretarial Compliance",
    categories: ["ACCOUNTING_AND_PAYROLL", "SECRETARIAL_COMPLIANCE", "GLOBAL_SANCTIONS"],
  },
  {
    name: "debtInsolvencyBankruptcy",
    label: "Debt Recovery, Insolvency and Bankruptcy",
    categories: ["DEBT_RECOVERY", "INSOLVENCY_BANKRUPTCY"],
  },
  {
    name: "directIndirectTaxes",
    label: "Direct and Indirect Taxes",
    categories: ["DIRECT_TAX", "INDIRECT_TAX"],
  },
  {
    name: "criminalActivityMoneyLauderingSeriousFraud",
    label: "Criminal Activity, Money Laundering and Serious Fraud",
    categories: ["CRIMINAL_ACTIVITY", "MONEY_LAUNDERING", "SERIOUS_FRAUD"],
  },
  {
    name: "miscellaneous",
    label: "Miscellaneous",
    categories: ["MISCELLANEOUS", "LABOUR_LAWS", "ASSURANCE"],
  },
]

class NewRegulatoryScene extends React.Component {
  title = "Regulator Checks"
  render() {
    const {
      enablePrint = true,
      enableTitle = true,
      targetType,
      target,
      checks,
      records,
    } = this.props

    return (
      <ItemWrapper
        // title={this.title}
        enableTitle={enableTitle}
        enablePrint={enablePrint}
      >
        {targetType == "DIRECTOR" ? (
          <TrackIfVisible {...trackingOptions} name={"DirectorRegulatorChecks"}>
            <div style={{ padding: "8px" }} name={`DirectorRegulatorChecks`}>
              <AnalysisBlock>
                <Paper>
                  <CardHeader title={"Regulator Checks"} />
                  <RegulatorChecks
                    targetType={"DIRECTOR"}
                    target={target}
                    checks={checks}
                    records={records}
                    hideshowAllButton={true}
                    relation={["TARGET"]}
                  />
                </Paper>
              </AnalysisBlock>
            </div>
          </TrackIfVisible>
        ) : (
          REGULATOR_CHECKS_SECTIONS.map((section, index) => (
            <TrackIfVisible key={index} {...trackingOptions} name={section.name}>
              <div style={{ padding: "8px" }} name={section.name}>
                <AnalysisBlock>
                  <Paper>
                    <CardHeader title={section.label} />
                    <RegulatorChecks
                      target={target}
                      categoryType={section.label}
                      hideshowAllButton={true}
                      relation={["TARGET"]}
                      checks={filter(
                        checks,
                        (item) => section.categories.indexOf(item.category) > -1
                      )}
                      records={filter(
                        records,
                        (item) => section.categories.indexOf(item.check.category) > -1
                      )}
                    />
                  </Paper>
                </AnalysisBlock>
              </div>
            </TrackIfVisible>
          ))
        )}
      </ItemWrapper>
    )
  }
}

function addProps(ownProps) {
  const entityChecks = getRegulatoryChecks(ownProps)
  const allRegulatoryRecords = getAllRegulatorItems(ownProps).filter(
    (el) => el.relation[0] == "TARGET" && el.check_group == "STANDARD_CHECKS"
  )

  const checks = entityChecks && entityChecks.checks ? entityChecks.checks : []
  const entity = entityChecks && entityChecks.entity ? entityChecks.entity : {}
  const records = allRegulatoryRecords
  return {
    targetType: getTargetType(ownProps),
    target: entity,
    checks: checks,
    records: records,
  }
}

NewRegulatoryScene.propTypes = {
  enablePrint: PropTypes.bool,
  enableTitle: PropTypes.bool,
  targetType: PropTypes.string,
  target: EntityPropTypes,
  checks: PropTypes.arrayOf(RegulatorCheckPropTypes),
}

export default compose(withReport, withProps(addProps))(NewRegulatoryScene)
