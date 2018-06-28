import React from 'react';

export default class TipsListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* Tips List View receives props from Tips parent: */}
        Glassdoor found that the average American worker 
        could be earning <a href="https://www.glassdoor.com/blog/average-american-underpaid-7500/">
          $7,528, or 13.3 percent, more per year.
        </a> 
        <br></br>
        Failing to negotiate can cost you a lot of money over time. 
         Luckily, we have gathered the strategies for you to stand up for what you deserve!
        <ul>
          <li>
            The key to getting better at negotiating is to <b>PRACTICE.</b> 
            This is why PayMe has a <i>Negotiation Practice</i> section for you 
            to practice with a partner.
          </li>
          <li>
            Know <b>your number.</b> PayMe has gathered all of the research for you 
            in our <i>Negotiation Tips</i> section, based on data from Glassdoor and LinkedIn,
            so that you don't have to worry about gathering the research yourself.
          </li>
          <li>
             Start the negotiation conversation with <b>enthusiasm.</b>
            According to <a href="http://www.businessinsider.com/how-to-negotiate-a-salary-2018-3?utm_content=buffer20a46&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer-careers">Business Insider,</a>
            You should say something like, "I am so excited by this opportunity to join your team. Based on my previous experience, 
            I would like a base salary ranging from $70 to 75K instead of $65K. 
            We are very close. Can you regroup with your team and let's talk later today?"
          </li>
          <li>
            <b>Don't be apologetic</b> in asking for more money. 
            According to Business Insider, instead of saying something like, 
            "Do you think maybe it is possible to get a bit higher salary? 
            I know I have only been making $65K but I would like to try to make more money," 
            You should say, "I bring a lot of expertise to this position. 
            Comparable positions pay $70 to 75K. 
            Let's figure out how we can make this happen and I am ready to accept."
          </li>
          <li>
            When asking for that raise, make sure you tell your supervisor <b>what you have 
            already done for the company</b> and why you deserve to be paid more. You can jot down
            your accomplishments in our PayMe <i>Milestones</i> section!
          </li>
        </ul>
      </div>
    )
  }
};
