// import React, { Fragment } from 'react';
// import MilestoneForm from './MilestoneForm.jsx';
// import MilestoneListView from './MilestoneListView';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setMilestones } from '../../store/actions/userActions';
// import axios from 'axios';

// export class MilestoneList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       milestones: this.props.milestoneList || [],
//     };
//     this.fetchMilestone = this.fetchMilestone.bind(this);
//   }

//   componentDidMount() {
//     const set = this.setState.bind(this);
//     this.fetchMilestone((data) => {
//       set({ milestones: data });
//     });
//   }

//   fetchMilestone() {
//     let {id} = this.props.session.user;
//     if (id) {
//       axios.get(`api/milestones?user_id=${this.props.session.user.id}`)
//         .then((response) => {
//           callback(response.data)
//         });
//     } else {
//       this.props.history.push('/login')
//     }
//   }

//   render() {
//     const data = this.state.milestones;
//     console.log('this is data',data)
//     if (data === 0) {
//       return (
//         <div />
//       );
//     }
//     return (
//       <Fragment>
//         {data.map((milestone, key) => (
//           <MilestoneListView
//             key={key}
//             name={milestone.name}
//             description={milestone.description}
//             stack={milestone.tech_used}
//             repo={milestone.repo_link}
//           />
//         ))}
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return ({ session: state.user })
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({

//   });
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MilestoneList);