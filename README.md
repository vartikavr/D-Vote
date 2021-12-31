# DVote

DVote (Decentralized Voting) is an online voting system integrated with Blockchain technology. As the name suggests, this system would provide us a website that would be decentralized, i.e. no supreme governance would be required. It aims to solve the existing problems with EVMs (Electronic Voting Machines) and ballot systems and provide a secure and tamper-proof voting experience.

## Getting Started

- Prerequisite <br/>
  Node.js <br/>
  Metamask (browser extention)
- Clone the repository <br/>

```bash
git clone https://github.com/vartikavr/D-Vote.git
```

- Open command line in the <strong>cloned folder</strong>,
  - To install server-side dependencies, run `npm install`
  - To install client-side dependencies, run `cd client` and then, `npm install`
  - To run the application for development, run `npm run dev`<br/>
    (This would run both the client and server)
  - Open [localhost:3000](http://localhost:3000/) in the browser.

## About the website

The existing methods of voting (EVMs and ballot systems) have several issues in them, like requirements of resources for installation of polling booths, accessibility issues, time-consuming, not suitable for pandemic times, etc. Therefore, to solve such problems, I've proposed DVote as a solution. <br/>
This is a website that handles state-level elections (for now) and provides all election-related functionalities like maintaining valid constituencies' records, parties' records, voters' records, candidates' records, generating a digital voter ID card (called DVote card), voting mechanism, etc. It would have two main modules : the Election Commission of India and the voters. <br/>
The voting-related information i.e. vote count, candidates' info, etc would be managed using Ethereum blockchain, to ensure secure and tamper-proof voting. The other information (related to constituencies, voters, parties, etc) would be managed using the MongoDB database. Therefore, the website mainly uses the MERN stack + Ethereum blockchain (for now, Rinkeby Test Network is being used).

## Assumptions

- The number of users accessing and using this website has an upper limit of 1000 (much less than the real-life applicable count).
- Metamask (a browser extension) has to be installed on the user's device to cast a vote.
- The user's Metamask account address should be linked with their voter ID manually.

## Main functionalities

- On this website, the admin (an official of the Election Commission of India) would be responsible to start or end the election.
- Before the election is declared as started, the admin can add, edit or delete different valid constituencies, parties (along with their party symbols), valid voters, and valid contesting candidates.
- A constituency can only be added by an admin and before the election starts. For deleting an existing constituency, it should not contain any contesting candidate in it.
- A party can only be added by an admin and before the election starts. A party symbol corresponding to the newly added party has to be uploaded.
- A voter can only be added by an admin and before the election starts. The voter should have a valid constituency associated with him/her, and his/her voter ID must be linked to his/her Metamask account address, for them to successfully cast a vote. A voter can only be deleted from the electoral roll if he/she has not voted yet.
- A candidate can only be added by an admin and before the election starts. The candidate should be of a valid constituency and party. The admin can also update the candidate's details if the vote count of that candidate is not greater than 0.
- Any user using this website would be considered a potential voter. The user's currently logged-in Metamask account address would be detected automatically and would be checked in the electoral roll. If the account address is not found in the roll, i.e. it is not linked to any voter's voter ID, then the voter would be considered as an invalid voter and his/her vote would not be counted.
- The voting functionality would be enabled as soon as the election starts and ends as soon as the election is ended.
- Any voter (whether valid or invalid) can view his/her DVote card and view their current Metamask account address, connected voterID, whether they have voted or not, etc.
- The vote count corresponding to each contesting candidate would be displayed at all times and would be stored over the blockchain. This would provide transparency and a tamper-proof voting experience to all.
- As soon as the admin ends the election, the result corresponding to each constituency would be calculated and from that, the final election result would be declared on the website, which can be viewed by all.
