import React from 'react';
import UserCardForm from 'react';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div className="ui teal card">
        <div className="image">
          <img src="/images/gitchardhubbard.png" alt=""/>
        </div>
        <div className="content">
          <a>
            Gitchard Hubbard
          </a>
          <div className="meta">
            <span className="description">
              Software Engineer at Google
            </span>
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="envelope icon"></i>
            SirGitchardHubbard@gmail.com
            <br />
          </a>
          <a>
            <i className="dollar sign icon"></i>
            105,000
          </a>
          <a>
            <span className="right floated">
              <i className="edit icon" />
            </span>
          </a>
        </div>
      </div>
    );
  }
}
