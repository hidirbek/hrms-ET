import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./CompanyDropdown.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const DropdownItem = (department) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>
        <strong className="comStr_title">
          {department.department.dep_title}
        </strong>
        <p className="comStr_head">{department.department.dep_head}</p>
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
                  <p className="comStr_head">{div.div_head}</p>
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
                        <p className="comStr_head">{team.team_head}</p>
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
        <p className="comStr_head">{coe.coe.coe_head}</p>
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
                  <p className="comStr_head">{dep.dep_head}</p>
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
                            <p className="comStr_head">{div.div_head}</p>
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
                                      <p className="comStr_head">
                                        {team.team_head}
                                      </p>
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
  const [loading, setLoading] = useState(true);
  // console.log(departments.departments);

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
      console.log(response.data[0]);
      setDepartments(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
    <div className="company_dropdown dropdown-container">
      <h1>CEO:{departments.ceo}</h1>
      {departments.departments.map((dep) => {
        return <DropdownItem department={dep} />;
      })}
      {departments.coe.map((coe) => {
        console.log(coe);
        return <CoeDep coe={coe} />;
      })}
    </div>
  );
};

export default CompanyDropdown;
