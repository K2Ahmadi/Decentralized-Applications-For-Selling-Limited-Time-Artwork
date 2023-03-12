// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

uint256 constant ITEMS=8;

contract ArtWork {
    address public owner = msg.sender; //set public address as owner property on blockchain

    struct Art {
        uint256 price; //starting as static and bring it down to 0 once its bought (disappears from homepage after bought)
        address owner;
        string name;
        string description;
        string image;
        uint256 exptime;
    }

    Art[ITEMS] public postings;

    constructor() {

        postings[0].price=3e17;
        postings[0].owner=address(0x0);
        postings[0].name="Smiley";
        postings[0].description="Innocent boy eager to become clan leader";
        postings[0].image='https://raw.githubusercontent.com/A2Keyan/CHE-1148-Assignment3-Figures/main/Obito1.JPG';
        postings[0].exptime = block.timestamp + 1 minutes;

        postings[1].price=1e18;
        postings[1].owner=address(0x0);
        postings[1].name="Despair";
        postings[1].description="Lost of All Hope";
        postings[1].image="https://raw.githubusercontent.com/A2Keyan/CHE-1148-Assignment3-Figures/main/Obito2.JPG";
        postings[1].exptime = block.timestamp + 5 minutes;

        postings[2].price=7e17;
        postings[2].owner=address(0x0);
        postings[2].name="Calm & Collect";
        postings[2].description="Warrior deciding his next move";
        postings[2].image="https://raw.githubusercontent.com/A2Keyan/CHE-1148-Assignment3-Figures/main/Obito3.JPG";
        postings[2].exptime = block.timestamp + 50 minutes;

        postings[3].price=2e18;
        postings[3].owner=address(0x0);
        postings[3].name="Rage";
        postings[3].description="Battle Aftermath";
        postings[3].image="https://raw.githubusercontent.com/A2Keyan/CHE-1148-Assignment3-Figures/main/Obito4.JPG";
        postings[3].exptime = block.timestamp + 3 minutes;

        postings[4].price=6e15;
        postings[4].owner=address(0x0);
        postings[4].name="Lionel Messi";
        postings[4].description="An Argentinian Football Genius";
        postings[4].image="https://wallpapercave.com/wp/wp3652286.png";
        postings[4].exptime = block.timestamp + 50 minutes;

        postings[5].price=7e17;
        postings[5].owner=address(0x0);
        postings[5].name="Cr7";
        postings[5].description="A Portuguese Football Legend";
        postings[5].image="https://scontent.fyzd1-3.fna.fbcdn.net/v/t39.30808-6/249041955_10158994381622746_2532123595925166948_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9267fe&_nc_ohc=4lV2xAnJsjsAX-cs7Qw&_nc_ht=scontent.fyzd1-3.fna&oh=00_AT9ds_fyLQ7QtI2ZT_qeVV-s8hQu3ipZM4IIyxdFILP-hQ&oe=63067163";
        postings[5].exptime = block.timestamp + 40 minutes;

        postings[6].price=2e18;
        postings[6].owner=address(0x0);
        postings[6].name="R9";
        postings[6].description="A Brazillian Football Icon";
        postings[6].image="https://i.pinimg.com/originals/e0/3c/61/e03c61e7b03e312ee9caaac8fe44b16e.jpg";
        postings[6].exptime = block.timestamp + 3 minutes;

        postings[7].price=8e18;
        postings[7].owner=address(0x0);
        postings[7].name="Thierry Henry";
        postings[7].description="A French Football Masterclass";
        postings[7].image="https://www.retroclasico.co.uk/wp-content/uploads/2020/08/THIERRY-HENRY-SQUARE.fw_.png";
        postings[7].exptime = block.timestamp + 20 minutes;
        
    //uint endTime = block.timestamp + 60 minutes;

    }
    //Function to purchase the ticket with multiple requirements needing to be satisfied for a valid transaction
    function buyArt(uint256 _index) external payable {
        require(_index < ITEMS && _index >=0); //making sure that the index is a real number
        require(check_if_available (_index)); //calling the check_if_available function (explained below)
        require(check_sufficient_funds(_index)); //calling the check_sufficient_funds function (explained below)
        require(block.timestamp < postings[_index].exptime); //ensuring the item is not expired. IF TIME EXPIRES, THE SMART CONTRACT WILL FAIL (tested)
        postings[_index].owner=msg.sender; //once bought, changing the ticket owner to the account holder of the wallet 
    }

    //Function to check if there is sufficient funds in the persons wallet before purchasing
	function check_sufficient_funds (uint _index) public payable returns (bool) {
		if (msg.value >= postings[_index].price) {
			return true;
		} else {
			return false;
		}
	}  

    //Function to check if the product they are purchasing is still available for sale with address = 0x0
	function check_if_available (uint _index) public view returns (bool) {
		if (postings[_index].owner == address(0x0)) {
			return true;
		} else {
			return false;
		}
	}
}