import React from "react";
import { Layout } from "../../components";
import DocumentTabs from "../../components/documentTabs/DocumentTabs";
import "./Documents.css";

const Documents = () => {
  return (
    <div>
      <Layout>
        <div className="documents_page-wrapper">
          <h1 className="page_title docs-title">Documents</h1>
          <div className="">
            <DocumentTabs />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Documents;
