import React from "react";

function TeamPage() {
  return (
    <div className="team-container">
      <div className="user-box">
        <img
          className="profile-pic"
          height="200"
          width="200"
          src="https://i.imgur.com/p4h8Fcp.jpg"
          alt="profile-pic"
        />
        <div>
          <ul>
            <li className="team-member-name">Kevin Okinedo</li>
            <li>McKinsey Apprentice</li>
            <div className="social-container">
              <li>
                <a href="https://www.linkedin.com/in/kevin-okinedo-39538719b/">
                  <img
                    src="https://www.svgrepo.com/show/16193/linkedin-logo.svg"
                    height="25"
                    width="25"
                    alt="linked-in-icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/kokinedo">
                  <img
                    height="25"
                    width="25"
                    src="https://www.svgrepo.com/show/341847/github.svg"
                    alt="github-icon"
                  />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div className="user-box">
        <img
          className="profile-pic"
          height="200"
          width="200"
          src="https://i.imgur.com/wxmozfs.jpg"
          alt="profile-pic"
        />
        <div>
          <ul>
            <li className="team-member-name">Nicholas Bryant</li>
            <li>McKinsey Apprentice</li>
            <div className="social-container">
              <li>
                <a href="https://www.linkedin.com/in/nickbryantd/">
                  <img
                    src="https://www.svgrepo.com/show/16193/linkedin-logo.svg"
                    height="25"
                    width="25"
                    alt="linked-in-icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/Datacreator001">
                  <img
                    height="25"
                    width="25"
                    src="https://www.svgrepo.com/show/341847/github.svg"
                    alt="github-icon"
                  />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div className="user-box">
        <img
          className="profile-pic"
          height="200"
          width="200"
          src="https://i.imgur.com/3yPBDdz.jpg"
          alt="profile-pic"
        />
        <div>
          <ul>
            <li className="team-member-name">Shafee Ahmed</li>
            <li>ClassPass Apprentice</li>
            <div className="social-container">
              <li>
                <a href="https://www.linkedin.com/in/shafeelinks/">
                  <img
                    src="https://www.svgrepo.com/show/16193/linkedin-logo.svg"
                    height="25"
                    width="25"
                    alt="linked-in-icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/shafeeshafee">
                  <img
                    height="25"
                    width="25"
                    src="https://www.svgrepo.com/show/341847/github.svg"
                    alt="github-icon"
                  />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
