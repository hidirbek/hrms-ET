import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./CompanyDropdown.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const DropdownItem = (department) => (
  <Accordion className="first_column">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>
        <strong className="comStr_title">
          {department.department.dep_title}
        </strong>
        <span className="comStr_head">{department.department.dep_head}</span>
      </Typography>
    </AccordionSummary>
    <AccordionDetails className="sub-department">
      {department.department.divisions &&
      department.department.divisions.length > 0 ? (
        department.department.divisions.map((div) => (
          //    {
          //   console.log(div);
          // }
          <Box key={uuidv4()} className="sub-department">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <strong className="comStr_title">{div.div_title}</strong>
                  <span className="comStr_head">{div.div_head}</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="sub-department">
                {div.team && div.team.length > 0 ? (
                  div.team.map((team) => (
                    //    {
                    //   console.log(div);
                    // }
                    <Box key={uuidv4()} className="sub-department">
                      <Typography>
                        <strong className="comStr_title">
                          {team.team_title}
                        </strong>
                        <span className="comStr_head">{team.team_head}</span>
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No Teams</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))
      ) : (
        <Typography>No Divisions</Typography>
      )}
    </AccordionDetails>
  </Accordion>
);
const CoeDep = (coe) => (
  //   {
  //   console.log(coe.coe.coe_dep.length);
  // };
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>
        <strong className="comStr_title">{coe.coe.coe_title}</strong>
        <span className="comStr_head">{coe.coe.coe_head}</span>
      </Typography>
    </AccordionSummary>
    <AccordionDetails className="sub-department">
      {coe.coe.coe_dep && coe.coe.coe_dep.length > 0 ? (
        coe.coe.coe_dep.map((dep) => (
          <Box key={uuidv4()} className="sub-department">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <strong className="comStr_title">{dep.dep_title}</strong>
                  <span className="comStr_head">{dep.dep_head}</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="sub-department">
                {dep.divisions && dep.divisions.length > 0 ? (
                  dep.divisions.map((div) => (
                    <Box key={uuidv4()} className="sub-department">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            <strong className="comStr_title">
                              {div.div_title}
                            </strong>
                            <span className="comStr_head">{div.div_head}</span>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="sub-department">
                          {div.team && div.team.length > 0 ? (
                            div.team.map((team) => (
                              //    {
                              //   console.log(div);
                              // }
                              <Box key={uuidv4()} className="sub-department">
                                <Accordion>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Typography>
                                      <strong className="comStr_title">
                                        {team.team_title}
                                      </strong>
                                      <span className="comStr_head">
                                        {team.team_head}
                                      </span>
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails className="sub-department"></AccordionDetails>
                                </Accordion>
                              </Box>
                            ))
                          ) : (
                            <Typography>No sub-departments</Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))
                ) : (
                  <Typography>No Teams</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))
      ) : (
        <Typography>No Divisions</Typography>
      )}
    </AccordionDetails>
  </Accordion>
);

const CompanyDropdown = () => {
  const [departments, setDepartments] = useState(null);
  // console.log(departments.departments);

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "http://10.30.0.46:4040/v1/company/get_all",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data[0]);
      setDepartments(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!departments) {
    // console.log(departments);
    return <div>Loading...</div>;
  }

  return (
    <div className="dropdown-container">
      <h1>CEO:{departments.ceo}</h1>
      <div className="company_dropdown">
        <div>
          {departments.departments.map((dep) => {
            // console.log(departments.departments.divisions);
            return <DropdownItem key={uuidv4()} department={dep} />;
          })}
        </div>
        <div>
          {departments.coe.map((coe) => {
            return <CoeDep key={uuidv4()} coe={coe} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyDropdown;
