// import external modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
   Form,
   Media,
   Collapse,
   Navbar,
   Nav,
   NavItem,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
   // Moon,
   Mail,
   Menu,
   MoreVertical,
   Check,
   Bell,
   User,
   AlertTriangle,
   Inbox,
   Phone,
   Calendar,
   Lock,
   X,
   LogOut
} from "react-feather";
import NavbarSearch from "../../../components/search/Search";
import ReactCountryFlag from "react-country-flag";

import userImage from "../../../assets/img/portrait/small/avatar-s-1.png";
import userImage2 from "../../../assets/img/portrait/small/avatar-s-2.png";
import userImage3 from "../../../assets/img/portrait/small/avatar-s-3.png";
import userImage4 from "../../../assets/img/portrait/small/avatar-s-4.png";

class ThemeNavbar extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("open");
      // console.log(localStorage.getItem(""))
   };
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   async componentDidMount() {
      try 
      {
        const headers = 
        {
          'identity': 'T7',
          'token': 'af1c9e83-266a-4c97-80fa-25c84e2f39fd'
        }
        this.state.custId = localStorage.getItem("custId");
        this.state.accId = localStorage.getItem("accId");
        console.log(this.state.custId);
        console.log(this.state.accId);
    
        axios
           .get(`http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/${this.state.custId}/details`,{headers})
           .then(res => {
             const persons = res.data;
             document.getElementById("name").innerHTML = persons["firstName"] + " " + persons["lastName"];
    
           });

         }
         catch (e) 
         {
           console.log(e);
         }
         
       };

   render() {
      return (
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
            <div className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />
                  <Form className="navbar-form mt-1 float-left" role="search">
                     <NavbarSearch />
                  </Form>
                  {/* <Moon size={20} color="#333" className="m-2 cursor-pointer"/> */}
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right" navbar>
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <ReactCountryFlag code="us" svg /> EN
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <ReactCountryFlag code="us" svg /> English
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="fr" svg /> France
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="es" svg /> Spanish
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="cn" svg /> Chinese
                              </DropdownItem>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                        
                        
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <span id="name"className="font-small-3">
                                    <span className="text-muted">(Guest)</span>
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />

                              <Link to="/pages/user-profile" className="p-0">
                                 <DropdownItem>
                                    <User size={16} className="mr-1" /> My Profile
                                 </DropdownItem>
                              </Link>
                              <Link to="/email" className="p-0">
                                 <DropdownItem>
                                    <Inbox size={16} className="mr-1" /> Email
                                 </DropdownItem>
                              </Link>
                              <Link to="/contacts" className="p-0">
                                 <DropdownItem>
                                    <Phone size={16} className="mr-1" /> Contacts
                                 </DropdownItem>
                              </Link>
                              <Link to="/calendar" className="p-0">
                                 <DropdownItem>
                                    <Calendar size={16} className="mr-1" /> Calendar
                                 </DropdownItem>
                              </Link>
                              <DropdownItem divider />
                              <Link to="/pages/lockscreen" className="p-0">
                                 <DropdownItem>
                                    <Lock size={16} className="mr-1" /> Lock Screen
                                 </DropdownItem>
                              </Link>
                              <Link to="/pages/login" className="p-0">
                                 <DropdownItem>
                                    <LogOut size={16} className="mr-1" /> Logout
                                 </DropdownItem>
                              </Link>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      );
   }
}

export default ThemeNavbar;
