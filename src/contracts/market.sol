pragma solidity 0.5.16;
contract market{
    uint public productcount=0;
    mapping(uint=>product) public products;
       struct product{
           uint id;
           string name;
           uint price;
           string desc;
           string img;
           address payable owner;
           bool purchased;
       }
       event Productcreated(
           uint id,
           string name,
           uint price,
            string desc,
           string img,
           address payable owner,
           bool purchased);
           event Productpurchased(
           uint id,
           string name,
           uint price,
           address payable owner,
           bool purchased);

       function createproduct(string memory _name,uint _price,string memory _desc,string memory _img)public{
           require(bytes(_name).length > 0);
           require(_price > 0);
           productcount++;
           products[productcount]=product(productcount,_name,_price,_desc,_img,msg.sender,false);
           emit Productcreated(productcount,_name,_price,_desc,_img,msg.sender,false);
       }
       function purchase(uint _id) public payable{
           product memory _product=products[_id];
           address payable seller=_product.owner;
           _product.owner=msg.sender;
           _product.purchased=true;
           products[_id]=_product;
           address(seller).transfer(msg.value);
           emit Productpurchased(productcount,_product.name,_product.price,msg.sender,true);
       }       
}

