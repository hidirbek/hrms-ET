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
import { v4 as uuidv4 } from "uuid";
import apiRequest from "../../service/request";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { jwtDecode } from "jwt-decode";
import CompanyModal from "../companyModal/CompanyModal";

const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token);
const role = decoded.role;

const DropdownItem = (department) => (
  <Accordion className="first_column">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      className="accordion_comp"
    >
      <Typography>
        <strong className="comStr_title">{department.department.title}</strong>
        <span className="comStr_head">{department.department.head}</span>
      </Typography>
      {role === "admin" ? (
        <div style={{ display: "flex" }}>
          <CompanyModal
            title={department.department.title}
            head={department.department.head}
            onClick={(event) => event.stopPropagation()}
          />
          <DeleteOutlineIcon
            className="del_icon"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
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
                className="accordion_comp"
              >
                <Typography>
                  <strong className="comStr_title">{div.title}</strong>
                  <span className="comStr_head">{div.head}</span>
                </Typography>
                {role === "admin" ? (
                  <div>
                    <CompanyModal
                      title={div.title}
                      head={div.head}
                      onClick={(event) => event.stopPropagation()}
                    />
                    <DeleteOutlineIcon
                      className="del_icon"
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>
                ) : null}
              </AccordionSummary>
              <AccordionDetails className="sub-department">
                {div.team && div.team.length > 0 ? (
                  div.team.map((team) => (
                    //    {
                    //   console.log(div);
                    // }
                    <Box key={uuidv4()} className="sub-department">
                      <Box className="accordion_comp_nowr">
                        <div>
                          <strong className="comStr_title">{team.title}</strong>
                          <span className="comStr_head">{team.head}</span>
                        </div>
                        {role === "admin" ? (
                          <div style={{ display: "flex" }}>
                            <CompanyModal
                              title={team.title}
                              head={team.head}
                              onClick={(event) => event.stopPropagation()}
                            />
                            <DeleteOutlineIcon
                              className="del_icon"
                              onClick={(event) => event.stopPropagation()}
                            />
                          </div>
                        ) : null}
                      </Box>
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
  //   console.log(coe.coe.dep.length);
  // };
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      className="accordion_comp"
    >
      <Typography>
        <strong className="comStr_title">{coe.coe.title}</strong>
        <span className="comStr_head">{coe.coe.head}</span>
      </Typography>
      {role === "admin" ? (
        <div style={{ display: "flex" }}>
          <CompanyModal
            title={coe.coe.title}
            head={coe.coe.head}
            onClick={(event) => event.stopPropagation()}
          />
          <DeleteOutlineIcon
            className="del_icon"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </AccordionSummary>
    <AccordionDetails className="sub-department">
      {coe.coe.dep && coe.coe.dep.length > 0 ? (
        coe.coe.dep.map((dep) => (
          <Box key={uuidv4()} className="sub-department">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="accordion_comp"
              >
                <Typography>
                  <strong className="comStr_title">{dep.title}</strong>
                  <span className="comStr_head">{dep.head}</span>
                </Typography>
                {role === "admin" ? (
                  <div style={{ display: "flex" }}>
                    <CompanyModal
                      title={dep.title}
                      head={dep.head}
                      onClick={(event) => event.stopPropagation()}
                    />
                    <DeleteOutlineIcon
                      className="del_icon"
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>
                ) : null}
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
                          className="accordion_comp"
                        >
                          <Typography>
                            <strong className="comStr_title">
                              {div.title}
                            </strong>
                            <span className="comStr_head">{div.head}</span>
                          </Typography>
                          {role === "admin" ? (
                            <div style={{ display: "flex" }}>
                              <CompanyModal
                                title={div.title}
                                head={div.head}
                                onClick={(event) => event.stopPropagation()}
                              />
                              <DeleteOutlineIcon
                                className="del_icon"
                                onClick={(event) => event.stopPropagation()}
                              />
                            </div>
                          ) : null}
                        </AccordionSummary>
                        <AccordionDetails className="sub-department">
                          {div.team && div.team.length > 1 ? (
                            div.team.map((team) => (
                              //   {
                              //   console.log(div.team.length);
                              // }
                              <Box key={uuidv4()} className="sub-department">
                                <Box className="accordion_comp_nowr">
                                  <div>
                                    <strong className="comStr_title">
                                      {team.title}
                                    </strong>
                                    <span className="comStr_head">
                                      {team.head}
                                    </span>
                                  </div>
                                  {role === "admin" ? (
                                    <div style={{ display: "flex" }}>
                                      <CompanyModal
                                        title={team.title}
                                        head={team.head}
                                        onClick={(event) =>
                                          event.stopPropagation()
                                        }
                                      />
                                      <DeleteOutlineIcon
                                        className="del_icon"
                                        onClick={(event) =>
                                          event.stopPropagation()
                                        }
                                      />
                                    </div>
                                  ) : null}
                                </Box>
                              </Box>
                            ))
                          ) : (
                            <Box>No Teams</Box>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))
                ) : (
                  <Box>No Division</Box>
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

  const fetchData = async () => {
    try {
      const response = await apiRequest.get("/company/get_all");
      setDepartments(response[0]);
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
          {departments &&
            departments.departments.map((dep) => {
              // console.log(departments.departments.divisions);
              return <DropdownItem key={uuidv4()} department={dep} />;
            })}
        </div>
        <div>
          {departments &&
            departments.coe.map((coe) => {
              return <CoeDep key={uuidv4()} coe={coe} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default CompanyDropdown;
