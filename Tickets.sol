// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Tickets is ERC721, ERC721Enumerable, Pausable, Ownable {

    //       Property Variables        // 
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    // 18 decimals
    uint256 public MAX_SUPPLY = 10000;
    uint256 public MINT_PRICE = 0.05 ether;

    //       Lifecycle Method          //

    constructor() ERC721("Tickets", "TIC") {


        _tokenIdCounter.increment();


    }

    function withdraw() public onlyOwner() {

        require(address(this).balance > 0,"No funds to withdraw!");
        payable(owner()).transfer(address(this).balance);
                

    }


    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://TicketsBaseURI/";
    }

    //        Pausable Method          //

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


    //        Minting function        //

    function publicMint() public payable {
        require(totalSupply() < MAX_SUPPLY, "Ticket has sold out!");
        require(msg.value == MINT_PRICE, "Insufficient funds, please try again!");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }


    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }



    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    
}
