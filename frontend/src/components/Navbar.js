import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import hooks
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


const Nav = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const NavBrand = styled.div`
  font-size: 1.5rem;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;



const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

    return ( 
        <Nav>
        <NavBrand>Quotes { user && <span>- {user.username}</span>}</NavBrand>
        <NavMenu>
          <NavItem>
          <NavLink to="/">Quotes</NavLink>
          </NavItem>
          {user &&
          <>
            <NavItem>
              <NavLink to="/sign-in" onClick={logout}>Logout</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/home/:user">Your Quotes</NavLink>
            </NavItem>
          </>
          }
          {!user &&
          <>   
          <NavItem>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/sign-in">Login</NavLink>
          </NavItem>
          </>
          }
        </NavMenu>
      </Nav>
     );
}
 
export default Navbar;