// src/components/OrgChartTree.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "react-d3-tree";

const OrgChartTree = () => {
  const [departments, setDepartments] = useState(null);
  console.log(departments);
  const transformData = (data) => {
    const transformTeam = (team) => {
      console.log(team);
      return {
        name: team.team_title,
        collapsed: true,
        attributes: {
          head: team.team_head,
        },
      };
    };

    const transformDivision = (division) => {
      return {
        name: division.div_title,
        collapsed: true,
        attributes: {
          head: division.div_head,
        },
        children: [...division.team.map(transformTeam)],
      };
    };

    const transformDepartment = (department) => {
      return {
        name: department.dep_title,
        collapsed: true,
        attributes: {
          Head: department.dep_head,
        },

        children: [...department.divisions.map(transformDivision)],
      };
    };

    return {
      name: "CEO",
      collapsed: true,
      attributes: {
        CEO: data.ceo,
      },
      children: data.departments.map(transformDepartment),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "http://10.30.0.46:4040/v1/company/get_companyStructure",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const transformedData = transformData(response.data[0]);
        setDepartments(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!departments) {
    return <div>Loading...</div>;
  }

  return (
    <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
      <Tree data={departments} translate={{ x: 20, y: 300 }} zoom={1} />
    </div>
  );
};

export default OrgChartTree;
