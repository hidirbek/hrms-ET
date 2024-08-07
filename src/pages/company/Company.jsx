import React from "react";
import { Layout } from "../../components";
import "./Company.css";
import CompanyDropdown from "../../components/companyDropdown/CompanyDropdown";

const Company = () => {
  return (
    <Layout>
      <div className="company_pg">
        <div className="page_title company-title">Company</div>
        <div className="company_content-wrapper">
          <div className="company_content">
            <div className="">
              <CompanyDropdown />

              {/* <CompanyTree /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
