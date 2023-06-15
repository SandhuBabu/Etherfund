// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Etherfund {
    uint256 minimuContribution = 0.5 ether; // minimum value for contribution 
    uint256 totalCampaigns = 0; // for creating id for campaigns (increments after inserting each campaign to array)

    // Campaign structure to save data of campaign
    struct Campaign {
        uint256 id;
        uint256 createdAt; // in timestamp
        address payable fundRaiser; // address of fundraiser
        string title;
        string desc;
        string imageURL;
        string category;
        uint256 amountRequired;
        uint256 collectedAmount;
        uint256 deadline;
        uint256 noOfVoters; // total voters
        bool isCompleted;
    }
    Campaign[] public campaigns; // to save each campaign

    struct CampaignMoreDetails {
        uint256 campaignId;
        bool isRequestedToVote;
        bool isGoalAchieved;
    }
    CampaignMoreDetails[] public campaignMoreDetails;

    struct Contributor {
        address contributor;
        uint256 amountContributed;
    }
    mapping(uint256 => Contributor[]) public contributors; // campaign id maps contributors

    struct Request {
        uint256 campaignId;
        address fundRaiser;
        uint256 amount;
        uint256 deadline;
        bool isVoted;
    }
    mapping(address => Request[]) public requests; // msg.sender maps requests

    // create a new campaign
    function createCampaign(
        string memory _title,
        string memory _desc,
        string memory _category,
        string memory _imageURL,
        uint256 _deadline,
        uint256 _amountRequired
    ) public {
        uint256 twoDaysInSeconds = 2 * 24 * 60 * 60; // 2 days in seconds
        require(
            _deadline > (block.timestamp - twoDaysInSeconds),
            "Project must be posted before two days"
        );

        Campaign memory newCampaign = Campaign(
            totalCampaigns,
            block.timestamp, // timestamp when the new block is created
            payable(msg.sender), // address of fundraiser is converting to payable for withdrawl in future
            _title,
            _desc,
            _imageURL,
            _category,
            _amountRequired,
            0, // collected amount initially 0
            _deadline,
            0, // no of voters initially 0,
            false // campaign completed is initially false
        );

        campaigns.push(newCampaign); // push newly created campaign to array

        CampaignMoreDetails memory newCampaignMoreDetails = CampaignMoreDetails(
            totalCampaigns,
            false, // is the campaign requested to vote
            false // is the campaign achieved the goal
        );

        campaignMoreDetails.push(newCampaignMoreDetails);

        totalCampaigns++; // increment no of campaigns
    }

    // contribute ether
    function contribute(uint256 campaignId) public payable {
        require(
            msg.value >= minimuContribution,
            "Minimun contribution is 0.5 ether"
        );
        require(
            campaignMoreDetails[campaignId].isGoalAchieved == false,
            "The goal is achieved already"
        );

        // incrementing collected amount of campaingn
        campaigns[campaignId].collectedAmount += msg.value;
        bool newContributer = true;
        Contributor[] storage contributorsList = contributors[campaignId];

        for (uint256 i = 0; i < contributorsList.length; i++) {
            if (contributorsList[i].contributor == msg.sender) {
                // increment contributed amount of a person for 2nd contribution
                contributorsList[i].amountContributed += msg.value;
                newContributer = false;
                break;
            }
        }
        if (newContributer) {
            // creating new contributor
            Contributor memory contributor = Contributor({
                contributor: msg.sender,
                amountContributed: msg.value
            });
            contributorsList.push(contributor);
        }

        if (
            campaigns[campaignId].collectedAmount >=
            campaigns[campaignId].amountRequired
        ) {
            campaignMoreDetails[campaignId].isGoalAchieved = true;
        }
    }

    // Request to vote
    function requestVote(uint256 _campaignId) public {
        require(
            campaigns[_campaignId].fundRaiser == msg.sender,
            "You are not the fundraiser"
        );
        require(
            campaigns[_campaignId].collectedAmount >=
                campaigns[_campaignId].amountRequired,
            "The goal is not achieved"
        );
        require(
            campaignMoreDetails[_campaignId].isRequestedToVote = true,
            "Already requested"
        );

        Contributor[] storage contributorsList = contributors[_campaignId]; // get all contributors
        for (uint256 i = 0; i < contributorsList.length; i++) {
            Request memory newRequest = Request(
                _campaignId,
                msg.sender,
                contributorsList[i].amountContributed,
                campaigns[_campaignId].deadline,
                false // initially voted is false
            );
            requests[contributorsList[i].contributor].push(newRequest);
        }

        campaignMoreDetails[_campaignId].isRequestedToVote = true;
    }

    // vote for a campaign
    function voteForCampaign(uint256 campaignId) public {
        Request[] storage requestList = requests[msg.sender];

        for (uint256 i = 0; i < requestList.length; i++) {
            if (
                requestList[i].campaignId == campaignId &&
                requestList[i].isVoted == false
            ) {
                requestList[i].isVoted = true;
                campaigns[campaignId].noOfVoters++;
            }
        }
    }

    // withdraw after voted half of the contributors
    function withdrawEther(uint256 campaignId) public {
        require(
            msg.sender == campaigns[campaignId].fundRaiser,
            "You are not the fundraiser"
        );
        require(
            campaigns[campaignId].noOfVoters >
                (contributors[campaignId].length / 2),
            "Not enough vote to withdraw"
        );

        campaigns[campaignId].fundRaiser.transfer(
            campaigns[campaignId].amountRequired
        );

        campaigns[campaignId].isCompleted = true;
    }

    // get all incompleted campaigns
    function getIncompleteCampaigns() public view returns (Campaign[] memory) {
        uint256 count = 0; // total count of incomplete campaigns
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (!campaigns[i].isCompleted) {
                count++;
            }
        }

        Campaign[] memory result = new Campaign[](count); // create an instance of Campaign with size count
        uint256 j = 0;
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (!campaigns[i].isCompleted) {
                result[j] = campaigns[i];
                j++;
            }
        }
        return result;
    }

    // get all campaigns created by a user
    function getMyCampaigns() public view returns (Campaign[] memory) {
        // get count of campaigns created by user(msg.sender)
        uint256 count = 0;
        for (uint256 i = 0; i < campaigns.length; i++)
            if (campaigns[i].fundRaiser == msg.sender) count++;

        Campaign[] memory myCampaigns = new Campaign[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < count; i++) {
            if (campaigns[i].fundRaiser == msg.sender) {
                myCampaigns[j] = campaigns[i];
                j++;
            }
        }
        return myCampaigns;
    }

    // get all requests
    function getMyRequests() public view returns (Request[] memory) {
        return requests[msg.sender];
    }

    // get details about a campaign with campaignId
    function getCampaignDetails(uint256 _campaignId)
        public
        view
        returns (Campaign memory)
    {
        return campaigns[_campaignId];
    }

    function getCampaignMoreDetails(uint _campaignId) public view returns(CampaignMoreDetails memory) {
        return campaignMoreDetails[_campaignId];
    }

    function getWithdrawStatus(uint _campaignId) public view returns(bool) {
        return campaigns[_campaignId].noOfVoters > (contributors[_campaignId].length / 2);
    }
}