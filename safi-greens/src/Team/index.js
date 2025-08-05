import React, { useState, useRef, useEffect } from "react";
import GaugeCard from "./components/Team-gauges/index";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";

const teamMembers = [
  { id: 1, name: "Fana Asmelash", location: "Korokocho", phone: "+254749022222", access: "admin" },
  { id: 2, name: "Kevine Umutoni", location: "Marikiti", phone: "+25038475543", access: "admin" },
  { id: 3, name: "Nebyat Hailu", location: "Karen", phone: "+25038375943", access:"admin" },
  { id: 4, name: "Rigbe Weleslase", location: "Nairobi", phone: "+25038575943", access: "admin" },
  { id: 5, name: "Hewaan Mehari", location: "Nairobi", phone: "+25038473343", access: "manager" },
  { id: 6, name: "Tirsit Berihu", location: "Nairobi", phone: "+25038475333", access: "manager" },
];

const accessOptions = [
  { value: "", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
];

function AccessDropdown({ accessFilter, setAccessFilter, options }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const selectedLabel = options.find((o) => o.value === accessFilter)?.label || "Select Access";

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-selected${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o); }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedLabel}
        <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} style={{ marginLeft: 10, color: "#888" }} />
      </div>
      {open && (
        <div className="dropdown-list" role="list">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item${accessFilter === option.value ? " selected" : ""}`}
              onClick={() => {
                setAccessFilter(option.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={accessFilter === option.value}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setAccessFilter(option.value);
                  setOpen(false);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const TeamTable = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [accessFilter, setAccessFilter] = useState("");

  const filteredTeamMembers = teamMembers.filter((member) => {
    if (accessFilter && member.access !== accessFilter) return false;
    return member.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalMembers = teamMembers.length;
  const adminCount = teamMembers.filter((member) => member.access === "admin").length;
  const managerCount = teamMembers.filter((member) => member.access === "manager").length;

  return (
    <div className="team-container" data-theme={theme.palette.mode}>

      <div className="dashboard-gauges">
        <GaugeCard value={totalMembers} description="Total Team Members" />
        <GaugeCard value={adminCount} description="Admins" />
        <GaugeCard value={managerCount} description="Managers" />
      </div>
      <header>
        <h1>Team</h1>
        <p>Managing the Team Members</p>
      </header>

      <div className="filters-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "350px" }}
        />
        <AccessDropdown
          accessFilter={accessFilter}
          setAccessFilter={setAccessFilter}
          options={accessOptions}
          style={{ width: "200px" }}
        />
      </div>

      <div className="table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeamMembers.length > 0 ? (
              filteredTeamMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.location}</td>
                  <td>{member.phone}</td>
                  <td>
                    <span className={`badge ${member.access}`}>{member.access}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No team members match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
